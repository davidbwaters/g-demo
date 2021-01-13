const DEFAULT_MAX_COL_WIDTH = 500;
const DEFAULT_COLS = "auto";
const DEFAULT_DEBOUNCE_MS = 300;
const DEFAULT_GAP_PX = 24;
const COL_COUNT_CSS_VAR_NAME = `--_masonry-layout-col-count`;
const GAP_CSS_VAR_NAME = `--_masonry-layout-gap`;
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const ELEMENT_NODE_TYPE = 1;
const DEBOUNCE_MAP = new Map();
/**
 * Returns a number attribute from an element.
 * @param $elem
 * @param name
 * @param defaultValue
 */
function getNumberAttribute($elem, name, defaultValue) {
    const value = parseFloat($elem.getAttribute(name) || "");
    return isNaN(value) ? defaultValue : value;
}
/**
 * Returns the amount of cols that the masonry grid should have.
 * @param totalWidth
 * @param cols
 * @param maxColWidth
 */
function getColCount(totalWidth, cols, maxColWidth) {
    return isNaN(cols)
        ? Math.max(1, Math.ceil(totalWidth / maxColWidth))
        : cols;
}
/**
 * Debounces a function.
 * @param cb
 * @param ms
 * @param id
 */
function debounce(cb, ms, id) {
    const existingTimeout = DEBOUNCE_MAP.get(id);
    if (existingTimeout != null)
        window.clearTimeout(existingTimeout);
    DEBOUNCE_MAP.set(id, window.setTimeout(cb, ms));
}
/**
 * Returns the index of the column with the smallest height.
 * @param colHeights
 */
function findSmallestColIndex(colHeights) {
    let smallestIndex = 0;
    let smallestHeight = Infinity;
    colHeights.forEach((height, i) => {
        if (height < smallestHeight) {
            smallestHeight = height;
            smallestIndex = i;
        }
    });
    return smallestIndex;
}

/**
 * Template for the masonry layout.
 * Max width of each column is computed as the width in percentage of
 * the column minus the total with of the gaps divided between each column.
 */
const $template = document.createElement("template");
$template.innerHTML = `
  <style>
    :host {
      display: flex;
      align-items: flex-start;
      justify-content: stretch;
    }

    .column {
	  max-width: calc((100% / var(${COL_COUNT_CSS_VAR_NAME}, 1) - ((var(${GAP_CSS_VAR_NAME}, ${DEFAULT_GAP_PX}px) * (var(${COL_COUNT_CSS_VAR_NAME}, 1) - 1) / var(${COL_COUNT_CSS_VAR_NAME}, 1)))));
	  width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .column:not(:last-child) {
      margin-right: var(${GAP_CSS_VAR_NAME}, ${DEFAULT_GAP_PX}px);
    }

    .column ::slotted(*) {
      margin-bottom: var(${GAP_CSS_VAR_NAME}, ${DEFAULT_GAP_PX}px);
      box-sizing: border-box;
      width: 100%;
    }

    /* Hide the items that has not yet found the correct slot */
    #unset-items {
      opacity: 0;
      position: absolute;
      pointer-events: none;
    }
  </style>
  <div id="unset-items">
    <slot></slot>
  </div>
`;
// Use polyfill only in browsers that lack native Shadow DOM.
window.ShadyCSS && window.ShadyCSS.prepareTemplateStyles($template, "masonry-layout");
/**
 * Masonry layout web component. It places the slotted elements in the optimal position based
 * on the available vertical space, just like mason fitting stones in a wall.
 * @example <masonry-layout><div class="item"></div><div class="item"></div></masonry-layout>
 * @csspart column - Each column of the masonry layout.
 * @csspart column-index - The specific column at the given index (eg. column-0 would target the first column and so on)
 * @slot - Items that should be distributed in the layout.
 */
class MasonryLayout extends HTMLElement {
    /**
     * Attach the shadow DOM.
     */
    constructor() {
        super();
        // Unique debounce ID so different masonry layouts on one page won't affect eachother
        this.debounceId = `layout_${Math.random()}`;
        // Resize observer that layouts when necessary
        this.ro = undefined;
        // The current request animation frame callback
        this.currentRequestAnimationFrameCallback = undefined;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild($template.content.cloneNode(true));
        this.onSlotChange = this.onSlotChange.bind(this);
        this.onResize = this.onResize.bind(this);
        this.layout = this.layout.bind(this);
        this.$unsetElementsSlot = this.shadowRoot.querySelector("#unset-items > slot");
    }
    // The observed attributes.
    // Whenever one of these changes we need to update the layout.
    static get observedAttributes() {
        return ["maxcolwidth", "gap", "cols"];
    }
    /**
     * The maximum width of each column if cols are set to auto.
     * @attr maxcolwidth
     * @param v
     */
    set maxColWidth(v) {
        this.setAttribute("maxcolwidth", v.toString());
    }
    get maxColWidth() {
        return getNumberAttribute(this, "maxcolwidth", DEFAULT_MAX_COL_WIDTH);
    }
    /**
     * The amount of columns.
     * @attr cols
     * @param v
     */
    set cols(v) {
        this.setAttribute("cols", v.toString());
    }
    get cols() {
        return getNumberAttribute(this, "cols", DEFAULT_COLS);
    }
    /**
     * The gap in pixels between the columns.
     * @attr gap
     * @param v
     */
    set gap(v) {
        this.setAttribute("gap", v.toString());
    }
    get gap() {
        return getNumberAttribute(this, "gap", DEFAULT_GAP_PX);
    }
    /**
     * The ms of debounce when the element resizes.
     * @attr debounce
     * @param v
     */
    set debounce(v) {
        this.setAttribute("debounce", v.toString());
    }
    get debounce() {
        return getNumberAttribute(this, "debounce", DEFAULT_DEBOUNCE_MS);
    }
    /**
     * The column elements.
     */
    get $columns() {
        return Array.from(this.shadowRoot.querySelectorAll(`.column`));
    }
    /**
     * Hook up event listeners when added to the DOM.
     */
    connectedCallback() {
        this.$unsetElementsSlot.addEventListener("slotchange", this.onSlotChange);
        // Attach resize observer so we can relayout eachtime the size changes
        if ("ResizeObserver" in window) {
            this.ro = new ResizeObserver(this.onResize);
            this.ro.observe(this);
        }
        else {
            window.addEventListener("resize", this.onResize);
        }
    }
    /**
     * Remove event listeners when removed from the DOM.
     */
    disconnectedCallback() {
        this.$unsetElementsSlot.removeEventListener("slotchange", this.onSlotChange);
        window.removeEventListener("resize", this.onResize);
        if (this.ro != null) {
            this.ro.unobserve(this);
        }
    }
    /**
     * Updates the layout when one of the observed attributes changes.
     */
    attributeChangedCallback(name) {
        switch (name) {
            case "gap":
                this.style.setProperty(GAP_CSS_VAR_NAME, `${this.gap}px`);
                break;
        }
        // Recalculate the layout
        this.scheduleLayout();
    }
    /**
     *
     */
    onSlotChange() {
        // Grab unset elements
        const $unsetElements = (this.$unsetElementsSlot.assignedNodes() || [])
            .filter(node => node.nodeType === ELEMENT_NODE_TYPE);
        // If there are more items not yet set layout straight awy to avoid the item being delayed in its render.
        if ($unsetElements.length > 0) {
            this.layout();
        }
    }
    /**
     * Each time the element resizes we need to schedule a layout
     * if the amount available columns has has changed.
     * @param entries
     */
    onResize(entries) {
        // Grab the width of the element. If it isn't provided by the resize observer entry
        // we compute it ourselves by looking at the offset width of the element.
        const { width } = entries != null && Array.isArray(entries) && entries.length > 0
            ? entries[0].contentRect : { width: this.offsetWidth };
        // Get the amount of columns we should have
        const colCount = getColCount(width, this.cols, this.maxColWidth);
        // Compare the amount of columns we should have to the current amount of columns.
        // Schedule a layout if they are no longer the same.
        if (colCount !== this.$columns.length) {
            this.scheduleLayout();
        }
    }
    /**
     * Render X amount of columns.
     * @param colCount
     */
    renderCols(colCount) {
        // Get the current columns
        const $columns = this.$columns;
        // If the amount of columns is correct we don't have to add new columns.
        if ($columns.length === colCount) {
            return;
        }
        // Remove all of the current columns
        for (const $column of $columns) {
            $column.parentNode && $column.parentNode.removeChild($column);
        }
        // Add some new columns
        for (let i = 0; i < colCount; i++) {
            // Create a column element
            const $column = document.createElement(`div`);
            $column.classList.add(`column`);
            $column.setAttribute(`part`, `column column-${i}`);
            // Add a slot with the name set to the index of the column
            const $slot = document.createElement(`slot`);
            $slot.setAttribute(`name`, i.toString());
            // Append the slot to the column an the column to the shadow root.
            $column.appendChild($slot);
            this.shadowRoot.appendChild($column);
        }
        // Set the column count so we can compute the correct width of the columns
        this.style.setProperty(COL_COUNT_CSS_VAR_NAME, colCount.toString());
        // Commit the changes for ShadyCSS
        window.ShadyCSS && window.ShadyCSS.styleElement(this);
    }
    /**
     * Schedules a layout.
     * @param ms
     */
    scheduleLayout(ms = this.debounce) {
        debounce(this.layout, ms, this.debounceId);
    }
    /**
     * Layouts the elements.
     */
    layout() {
        // Cancel the current animation frame callback
        if (this.currentRequestAnimationFrameCallback != null) {
            window.cancelAnimationFrame(this.currentRequestAnimationFrameCallback);
        }
        // Layout in the next animationframe
        this.currentRequestAnimationFrameCallback = requestAnimationFrame(() => {
            // console.time("layout");
            // Compute relevant values we are going to use for layouting the elements.
            const gap = this.gap;
            const $elements = Array.from(this.children)
                .filter(node => node.nodeType === ELEMENT_NODE_TYPE);
            const colCount = getColCount(this.offsetWidth, this.cols, this.maxColWidth);
            // Have an array that keeps track of the highest col height.
            const colHeights = Array(colCount).fill(0);
            // Instead of interleaving reads and writes we create an array for all writes so we can batch them at once.
            const writes = [];
            // Go through all elements and figure out what column (aka slot) they should be put in.
            // We only do reads in this for loop and postpone the writes
            for (const $elem of $elements) {
                // Read the height of the element
                const height = $elem.getBoundingClientRect().height;
                // Find the currently smallest column
                let smallestColIndex = findSmallestColIndex(colHeights);
                // Add the height of the item and the gap to the column heights.
                // It is very important we add the gap since the more elements we have,
                // the bigger the role the margins play when computing the actual height of the columns.
                colHeights[smallestColIndex] += height + gap;
                // Set the slot on the element to get the element to the correct column.
                // Only do it if the slot has actually changed.
                const newSlot = smallestColIndex.toString();
                if ($elem.slot !== newSlot) {
                    writes.push(() => ($elem.slot = newSlot));
                }
            }
            // Batch all the writes at once
            for (const write of writes) {
                write();
            }
            // Render the columns
            this.renderCols(colCount);
            // Commit the changes for ShadyCSS
            window.ShadyCSS && window.ShadyCSS.styleElement(this);
            // console.timeEnd("layout");
        });
    }
}
customElements.define("masonry-layout", MasonryLayout);

export { MasonryLayout };
