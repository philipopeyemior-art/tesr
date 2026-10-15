"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon } from "@/components/icons/icons";
import {
  AccordionItem,
  Avatar,
  Badge,
  Banner,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  DataTable,
  DropdownMenu,
  EmptyState,
  Input,
  Pagination,
  ProgressBar,
  Radio,
  Select,
  Skeleton,
  Stepper,
  Textarea,
  Tooltip,
} from "@/components/ui/primitives";
import styles from "./interactive-showcase.module.css";

export function Toggle({ label, checked, onChange, disabled = false }: { label: string; checked: boolean; onChange: (value: boolean) => void; disabled?: boolean }) {
  const id = useId();
  return (
    <div className={styles.toggleRow}>
      <span id={id} className={styles.toggleLabel}>{label}</span>
      <button className={styles.toggle} type="button" role="switch" aria-labelledby={id} aria-checked={checked} disabled={disabled} onClick={() => onChange(!checked)}>
        <span className={styles.toggleThumb} />
      </button>
    </div>
  );
}

export function Tabs({ items }: { items: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!items.length) return;
    let next = active;
    if (event.key === "ArrowRight") next = (active + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (active - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }
  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist" aria-label="Component example tabs" onKeyDown={handleKeyDown}>
        {items.map((item, index) => <button key={item.label} className={styles.tab} type="button" role="tab" id={`${baseId}-tab-${index}`} aria-selected={active === index} aria-controls={`${baseId}-panel-${index}`} tabIndex={active === index ? 0 : -1} ref={(node) => { refs.current[index] = node; }} onClick={() => setActive(index)}>{item.label}</button>)}
      </div>
      {items.map((item, index) => <div key={item.label} className={styles.tabPanel} role="tabpanel" id={`${baseId}-panel-${index}`} aria-labelledby={`${baseId}-tab-${index}`} hidden={active !== index} tabIndex={0}>{item.content}</div>)}
    </div>
  );
}

export function Dialog({ triggerLabel, title, children }: { triggerLabel: string; title: string; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  function showDialog() {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }
  return (
    <>
      <Button type="button" variant="outline" onClick={showDialog}>{triggerLabel}</Button>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId}>
        <div className={styles.dialogHeader}><h3 id={titleId}>{title}</h3><button className={styles.closeButton} type="button" onClick={() => dialogRef.current?.close()} aria-label="Close dialog"><Icon name="close" /></button></div>
        <div className={styles.dialogBody}>{children}</div>
        <footer className={styles.dialogFooter}><Button type="button" variant="outline" onClick={() => dialogRef.current?.close()}>Close</Button><Button type="button" variant="navy" onClick={() => dialogRef.current?.close()}>Continue</Button></footer>
      </dialog>
    </>
  );
}

export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return <div className={styles.toast} role="status" aria-live="polite"><span>{message}</span><button type="button" onClick={onDismiss} aria-label="Dismiss notification"><Icon name="close" width={18} height={18} /></button></div>;
}

export function InteractiveShowcase() {
  const [enabled, setEnabled] = useState(true);
  const [toast, setToast] = useState("");
  return (
    <div className={styles.showcase}>
      <p className={styles.keyboardNote}>Use Tab to see focus states. Use Enter or Space to activate controls. Tabs also support the arrow keys, Home, and End.</p>

      <section className={styles.componentBlock} id="buttons" aria-labelledby="buttons-title">
        <div className={styles.componentHeading}><h3 id="buttons-title">Button</h3><p>Primary action stays distinct from secondary and destructive actions.</p></div>
        <div className={styles.buttonSet}>
          <Button variant="navy" iconEnd={<Icon name="arrow-right" />}>Solid navy</Button>
          <div className={styles.darkSample}><Button variant="lime">Solid lime on dark</Button></div>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Destructive</Button>
          <Button variant="navy" iconStart={<Icon name="plus" />}>With icon</Button>
          <Button variant="navy" disabled>Disabled</Button>
          <Button variant="navy" loading>Loading</Button>
        </div>
      </section>

      <section className={styles.componentBlock} id="form-controls" aria-labelledby="fields-title">
        <div className={styles.componentHeading}><h3 id="fields-title">Inputs and choices</h3><p>Labels, helper text, required state, validation, and disabled controls.</p></div>
        <div className={styles.formGrid}>
          <Input label="Email address" type="email" placeholder="you@example.com" hint="We use this for account access." />
          <Input label="Work email" type="email" value="not-an-email" readOnly errorMessage="Enter an email address in the right format." />
          <Input label="Disabled field" value="Cannot edit right now" disabled readOnly />
          <Textarea label="Job description" placeholder="Paste the job description here." hint="You can review this text before continuing." />
          <Select label="Target location" defaultValue=""><option value="" disabled>Choose a location</option><option>Lagos</option><option>Remote</option></Select>
          <div className={styles.choiceGroup}><Checkbox label="Include a portfolio link" defaultChecked /><Checkbox label="Disabled option" disabled /><div role="group" aria-label="Resume style"><Radio name="resume-style" label="Simple" defaultChecked /><Radio name="resume-style" label="Modern" /></div></div>
          <div className={styles.choiceGroup}><Toggle label="Allow agent suggestions" checked={enabled} onChange={setEnabled} /><Toggle label="Unavailable control" checked={false} onChange={() => undefined} disabled /></div>
        </div>
      </section>

      <section className={styles.componentBlock} id="tabs-accordion" aria-labelledby="tabs-title">
        <div className={styles.componentHeading}><h3 id="tabs-title">Tabs and accordion</h3><p>Selected state is visible and the controls remain keyboard operable.</p></div>
        <Tabs items={[
          { label: "Overview", content: <p>See a short summary before opening more detail.</p> },
          { label: "Evidence", content: <p>Every application claim should link back to verified experience.</p> },
          { label: "History", content: <p>Review what changed and when the agent prepared it.</p> },
        ]} />
        <div className={styles.accordionSet}><AccordionItem title="What is included?" open><p>A clear answer with no hidden product behavior.</p></AccordionItem><AccordionItem title="What happens next?"><p>The user chooses whether to continue.</p></AccordionItem></div>
      </section>

      <section className={styles.componentBlock} id="badges-tooltips" aria-labelledby="badges-title">
        <div className={styles.componentHeading}><h3 id="badges-title">Badges, chips, and tooltip</h3><p>Short status labels use text and shape, not color alone.</p></div>
        <div className={styles.inlineSet}><Badge>Draft</Badge><Badge tone="success">Verified</Badge><Badge tone="warning">Needs review</Badge><Badge tone="danger">Rejected</Badge><Badge tone="info">Information</Badge></div>
        <div className={styles.inlineSet}><Chip>Remote</Chip><Chip selected>Full-time</Chip><Chip>Contract</Chip><span className={styles.tooltipPad}><Tooltip label="This label explains a detail without hiding required information.">What does this mean?</Tooltip></span></div>
      </section>

      <section className={styles.componentBlock} id="dialog-toast" aria-labelledby="dialog-title">
        <div className={styles.componentHeading}><h3 id="dialog-title">Dialog and toast</h3><p>The native modal dialog traps focus, and the notification can be dismissed.</p></div>
        <div className={styles.inlineSet}><Dialog triggerLabel="Open dialog" title="Review before continuing"><p>This dialog keeps focus inside until it is closed. Press Escape to dismiss it.</p></Dialog><Button variant="outline" type="button" onClick={() => setToast("Changes saved. Nothing was sent.")}>Show toast</Button></div>
        {toast ? <Toast message={toast} onDismiss={() => setToast("")} /> : <p className={styles.helperNote}>The toast appears here after you activate “Show toast”.</p>}
      </section>

      <section className={styles.componentBlock} id="feedback" aria-labelledby="feedback-title">
        <div className={styles.componentHeading}><h3 id="feedback-title">Progress, loading, and empty states</h3><p>Show the current state and the next useful action.</p></div>
        <div className={styles.feedbackGrid}>
          <div className={styles.exampleCard}><ProgressBar value={64} label="Profile completeness" /><ProgressBar value={38} label="Review progress" tone="lime" /></div>
          <div className={styles.exampleCard} aria-label="Loading content example"><Skeleton width="42%" height="1.1rem" /><Skeleton width="92%" /><Skeleton width="74%" /></div>
          <EmptyState title="No applications yet">Add a job you want to track. Your application list will appear here.</EmptyState>
        </div>
      </section>

      <section className={styles.componentBlock} id="banners" aria-labelledby="banners-title">
        <div className={styles.componentHeading}><h3 id="banners-title">Banners</h3><p>Info, success, warning, and error states keep their meaning without color alone.</p></div>
        <div className={styles.bannerStack}><Banner title="Information">Your documents stay in draft until you approve them.</Banner><Banner tone="success" title="Verified">This statement is supported by your saved profile.</Banner><Banner tone="warning" title="Needs attention">One detail needs your review before continuing.</Banner><Banner tone="error" title="Could not save">Your changes were not saved. Try again.</Banner></div>
      </section>

      <section className={styles.componentBlock} id="cards-tables" aria-labelledby="data-title">
        <div className={styles.componentHeading}><h3 id="data-title">Card, table, and pagination</h3><p>On narrow screens, table rows turn into labeled cards.</p></div>
        <Card><strong>Review before sending</strong><p className={styles.cardText}>A clear summary belongs before a high-impact decision.</p></Card>
        <DataTable caption="Example application stages" headers={["Application", "Status", "Next step"]} rows={[["Example role", "Draft", "Review documents"], ["Another example", "Ready for review", "Approve or request changes"]]} />
        <Pagination current={2} total={4} />
      </section>

      <section className={styles.componentBlock} id="navigation-primitives" aria-labelledby="navigation-title">
        <div className={styles.componentHeading}><h3 id="navigation-title">Avatar, dropdown, breadcrumbs, and stepper</h3><p>Navigation labels stay visible and actions have practical touch targets.</p></div>
        <div className={styles.inlineSet}><Avatar initials="JD" label="Profile for a sample user" /><DropdownMenu label="More actions" items={["View details", "Edit preferences", "Close menu"]} /></div>
        <Breadcrumbs items={[{ label: "Jobs", href: "#jobs" }, { label: "Application", href: "#application" }, { label: "Review" }]} />
        <Stepper steps={["Add a job", "Review documents", "Approve"]} current={2} />
      </section>

    </div>
  );
}
