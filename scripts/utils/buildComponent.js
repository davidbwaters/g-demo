/*
 *  Scripts - Utilities - Build Component
 */
import { html } from '../../modules/lit-html.js';
export function buildComponent(component) {
  let output;

  if (component.__component === 'section-block.angle-content') {
    output = html`
      <c-hero-frame
        id=${component.id}
        data=${JSON.stringify(component)}
      >
      </c-hero-frame>
    `;
  }

  if (component.__component === 'section-block.reveal-content') {
    output = html`
      <c-reveal-section
        id=${component.id}
        data=${JSON.stringify(component)}
      >
      </c-reveal-section>
    `;
  }

  if (component.__component === 'section-block.image-content') {
    output = html`
      <c-scale-section
        data=${JSON.stringify(component)}
        id=${component.id}
        component='image'
      >
      </c-scale-section>
    `;
  }

  if (component.__component === 'section-block.article') {
    output = html`
      <c-scale-section
        data=${JSON.stringify(component)}
        id=${component.id}
        component='article'
      >
      </c-scale-section>
    `;
  }

  if (component.__component === 'section-block.article') {
    output = html`
      <c-scale-section
        data=${JSON.stringify(component)}
        id=${component.id}
        component='article'
      >
      </c-scale-section>
    `;
  }

  if (component.__component === 'section-block.background-content') {
    output = html`
      <c-scale-section
        data=${JSON.stringify(component)}
        id=${component.id}
        component='background'
      >
      </c-scale-section>
    `;
  }

  if (component.__component === 'section-block.fade-animation') {
    output = html`
      <c-fade-transition
        data=${JSON.stringify(component)}
        id=${component.id}
      >
      </c-fade-transition>
    `;
  }

  if (component.__component === 'section-block.detail-content') {
    output = html`
      <c-details
        data=${JSON.stringify(component)}
        id=${component.id}
      >
      </c-details>
    `;
  }

  if (component.__component === 'section-block.contact-form') {
    output = html`
      <c-contact-form
        data=${JSON.stringify(component)}
        id=${component.id}
      >
      </c-contact-form>
    `;
  }

  if (component.__component === 'section-block.spec-list') {
    output = html`
      <c-speclist
        data=${JSON.stringify(component)}
        id=${component.id}
        component='rows'
      >
      </c-speclist>
    `;
  }

  if (component.__component === 'section-block.table') {
    output = html`
      <c-speclist
        data=${JSON.stringify(component)}
        id=${component.id}
      >
      </c-speclist>
    `;
  }

  if (component.__component === 'section-block.multi-heading-hero') {
    output = html`
      <c-hero-multi-heading
        data=${JSON.stringify(component)}
        id=${component.id}
      >
      </c-hero-multi-heading>
    `;
  }

  if (component.__component === 'section-block.drive-in-transition') {
    output = html`
      <c-drive-in
        data=${JSON.stringify(component)}
        id=${component.id}
      >
      </c-drive-in>
    `;
  }

  return output;
}