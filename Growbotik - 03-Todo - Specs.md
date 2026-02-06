# Todo Specs

[**Assumptions	1**](#assumptions)

[**Plan Executor	2**](#plan-executor)

[Responsibilities of Plan Executor	2](#responsibilities-of-plan-executor)

[Document Contents	2](#document-contents)

[**Todo	3**](#todo)

[What is a todo?	3](#what-is-a-todo?)

[Responsibilities of Todo Engine	3](#responsibilities-of-todo-engine)

[Best Practices	5](#best-practices)

[High Level flow	6](#high-level-flow)

[Archetypes of ToDo Items	6](#archetypes-of-todo-items)

[Information Requests	7](#information-requests)

[Integrations	7](#integrations)

[Feedback Requests	7](#feedback-requests)

[Vendor Requests	8](#vendor-requests)

[Payments	8](#payments)

[System Alerts	8](#system-alerts)

[Todo Statuses	9](#todo-statuses)

[Todo Intrinsic Priorities	9](#todo-intrinsic-priorities)

[Priority scoring Rule	10](#priority-scoring-rule)

[Todo Properties	10](#todo-properties)

[Todo Configuration Properties for archetypes	12](#todo-configuration-properties-for-archetypes)

[High Level Stories from stories with least dependency	12](#high-level-stories)

[**\===================================	14**](#===================================)

# Assumptions {#assumptions}

1. The Plan stage defines the sequence and timeline for executing the various products.  
2. The plan outlines all product dependencies.  
3. When a marketing plan reaches the execution stage, the system already recognizes the user, as the customer has an existing account in Growbotik.  
4. Direct businesses are the “contacts” of Umbrella agency.

# Plan Executor {#plan-executor}

1. Once a customer approves a marketing plan, the plan transitions into the execution phase.  
2. All approved marketing plans can be accessed through the Customer Hub, which serves as the central interface for both agencies and businesses to view plan details.  
3. Each approved plan will include the products, budget, and execution plan.  
4. Agencies will access the business’s plan through the subaccount selection within their agency view.  
5. Customers of the agency will receive a gray-labeled URL, or a white-labeled domain if the agency has configured it.  
6. Direct Businesses (whose agency is Umbrella) will access the Customer Hub via growbotik.com.  
7. The audit trail will record the individual performing any action within the customer account, whether it is a team member from the agency or from the business.

## Responsibilities of Plan Executor {#responsibilities-of-plan-executor}

1. Scan product briefs to ensure completeness based on the approved plans.  
2. Create to-dos for agencies or businesses to collect any missing items.  
3. Create vendor orders for all completed product briefs.  
4. Act as a communication bridge between vendors and customers.  
5. Review and categorize incoming vendor messages.  
6. Automatically respond to vendor queries or create a to-do item for the customer when needed  
7. Relay customer responses back to the respective vendors.  
8. Create payment schedules for approved plans (pending confirmation from Eyal).  
9. Process charges according to the payment schedules.  
10. Handle any payment failures promptly and accurately.  
11. Proactively identify expiring payment cards and notify customers to update their information.  
12. Publish timely updates regarding project status.  
13. Track project milestones, follow up on progress, and ensure timely completion.  
14. Process success-fee files received from vendors.

## Document Contents {#document-contents}

* Todo Engine and related specifications  
* Payment Engine and its responsibilities.  
* Communication orchestration among the actors  
* Project Management

# Todo {#todo}

## What is a todo? {#what-is-a-todo?}

A todo is a specific task that requires user action to move a project forward and general account maintenance wrt payments, integrations etc. A todo can be created by the system, vendor, and by subaccounts and agency in very rare cases. It clearly defines what needs to be done, what information is required, and when the task is considered complete

## Responsibilities of Todo Engine {#responsibilities-of-todo-engine}

A Todo Engine is the system that creates, structures, tracks, executes, validates, and completes tasks required from a user or internal team during onboarding, setup, or delivery processes. Its responsibilities typically include:

### 

**1\. Todo Creation & Structuring**

* Generate todos from templates, product requirements, onboarding flows, or workflow triggers.  
* Assign archetypes and field-types based on the information needed.  
* Support dynamic todo definitions (inputs, instructions, CTAs, validation rules).

**2\. Input Collection & Validation**

* Present correct input fields (text, file uploads, dropdowns, OAuth connectors, credentials, etc.).  
* Validate user submissions (format, file type, completeness, required fields).  
* Handle structured groups such as credentials, business info, intake forms.

**3\. Dependency & Blocking Logic**

* Determine which todos block progress and in what order they must be completed.  
* Enable conditional visibility (“show this todo only when X is completed”).  
* Mark todos as blocking or non-blocking and calculate overall onboarding readiness.

**4\. Assignment & Ownership**

* Assign todos to:  
  * The client (provide info, upload assets).  
  * The internal team (perform setup actions).  
  * The system (auto-connect, verify OAuth, import data).  
    

**5\. State Management**

* Each todo must move through states such as: Open → In progress → completed  
* The engine must:  
  * Update state based on user actions.  
  * Allow reviewers to approve or reject submissions.  
  * Re-open todos if changes are needed.

**6\. Notifications, Reminders & Tracking**

* Notify users when a new todo is assigned.  
* Send reminders for overdue or blocking todos.  
* Notify internal teams when submissions need review.

**7\. Automation & Workflow Integration**

* Trigger workflows / dependent actions when a todo is completed (e.g., connect Google Ads → sync campaigns).  
* Auto-create downstream todos based on conditions.  
* Interface with systems like OAuth, DNS lookup, hosting checks, etc.


**8\. Error Handling & Recovery**

* Handle invalid submissions, failed integrations, incomplete credentials.  
* Provide actionable error messages.  
* Allow users to revise and re-submit.

**9\. Audit & History**

* Maintain a full record of:  
  * What was submitted  
  * Who completed tasks  
  * Comments/notes  
* Expose audit logs for compliance or QA.

## Best Practices {#best-practices}

* Todos will be intelligently batched and presented through a guided, conversational interface to ensure a frictionless user experience.  
* Related todos will be automatically grouped to maintain context and reduce cognitive load for the customer.  
* When the same information is required across multiple products within a marketing plan, the todo engine will collect that input only once and propagate it to all dependent products.  
* All billing-related tasks will be handled exclusively by the Billing Agent and are intentionally excluded from the todo engine’s scope.  
* If execution for any product has begun and a new todo is generated, the engine will automatically elevate the priority of that todo to ensure timely resolution.  
* Todos support multi-session completion. For example, if a todo contains seven questions and the customer answers four in the first session, show the answered questions for review and the customer can continue to answer the rest of the questions.   
  * In this situation, during the second session, show the answers for the first four questions so customer can edit them before submitting that todo  
  * There will be one caveat here. If the system shows 3 todos for the customer and scoring formula (detailed below) determines that it got a higher scored todo than the lowest among the three shown, then it has to be included as the fourth one for the customer automatically.  
  * A todo that is already shown to the customer should not be hidden, irrespective of number of todos that are currently being shown  
* Provide micro-guidance, examples, or tooltips for each field to reduce errors and support effective completion.  
  * E.g. If it's a website brief, it will be like a discovery sequence.   
  * If it's a Click to Connect, it will open up by saying "Hey, please click the button below to connect to your Google Analytics so we can track the progress of your campaign. If you don't have one, we can set up one for you. ". And it will show two buttons/bubbles "Connect GA" / "Setup a new GA for me". Etc.  
  * We can use the same in-chat component engine Sergey is building for todos.  
* Validate inputs in real time and provide immediate corrective feedback.  
* Preserve partial progress continuously to prevent data loss across sessions or devices.  
* Pre-fill fields using available CRM or product data wherever possible to reduce repetitive actions.  
* Use progress indicators, checklists, or milestone notifications to motivate users toward full onboarding completion.  
* At any given time, the customer will be shown a maximum of three todo archetypes, prioritized by importance.  
* If there are more than 3 todos available for the customer, at the bottom, show “7 more to go” as a hyperlink. When the user taps that, it can expand and show the 7 more.  
* If additional todos exist, they will be surfaced incrementally—each time the customer completes one of the visible items, the next highest-priority archetype will be introduced.  
* When fewer than three archetypes remain, all available items will be displayed.  
   This approach creates a structured, gamified progression that enhances user experience and reduces cognitive overload.  
* Todos that are already created for a product or a plan that is cancelled should be automatically removed from the queue  
  


## High Level flow {#high-level-flow}

* Once a marketing plan is paid for and approved, the Plan Executor is activated.  
* After customer approval, the Plan Executor evaluates all product briefs within the marketing plan.  
* During this evaluation, any missing information required to fulfill the briefs is identified, consolidated across products, and de-duplicated.  
* All missing information items are organized into predefined Todo Archetypes. Each todo is assigned a priority, and the archetypes are ordered accordingly.  
* When a todo is completed, it moves from the “Open” section to the “Completed” section for clear tracking and auditability.  
* The Plan Executor continuously monitors whether sufficient information has been gathered to satisfy the requirements of each product brief.  
* Once a product brief is fully satisfied, the Plan Executor triggers a downstream service responsible for creating the appropriate vendor order and advancing the product’s execution status.  
* Todos can be created for an order that is currently in the fulfillment stage. For example: vendors might ask for website draft feedback and the feedback between vendor and customer can go back and forth until the customer is satisfied with the draft.   
* The Plan Executor also monitors vendor-side requests for additional information or clarifications and surfaces them to the customer as todos. When the customer provides the requested details, the system automatically relays that information back to the vendor.  
  * Data coming from the vendor as free text maybe \- and the system needs to convert it to the ToDo which requires choosing the right archetypes and fields and presenting the request to the user in the right fashion.   
  * Some sort of tasker agent with good marketing understanding (potentially Gemini connected with guardrails) can be used.  
* Additional system events—such as payment failures, expiring credit cards, or other operational triggers—can also generate todos.  
* The Plan Executor serves as the primary communication relay between vendors and customers. When vendors request information, the Plan Executor first attempts to resolve the request from the vendor using available customer profile data. Only when no suitable information is found is a todo created and sent to the customer.

## Archetypes of ToDo Items {#archetypes-of-todo-items}

### Information Requests  {#information-requests}

Tasks in this archetype collect essential business, credential, or content inputs required for product execution. The Todo Engine identifies missing data, de-duplicates requests across products, and surfaces them as structured information-collection tasks. Examples of information requests include

* Upload high-resolution logo  
* Provide business information  
* Provide website login credentials  
* Provide keywords (SEO, PPC, PR article)  
* Provide hosting credentials (host, username, password)  
* Upload requested documents (insurance, license, photos)  
* Adhoc info requests from vendor  
* Select appropriate business category  
* Submit review replies (Gradeus/Yext)

### Integrations {#integrations}

These tasks gather permissions or initiate external-system connections required for automated workflows. The Todo Engine validates connection status, detects failures, and triggers retries or follow-up actions. Examples of integrations include:

* Provide Google Business Profile access  
* Connect Google Ads  
* Connect Facebook Ads  
* Provide DNS access for domain configuration  
* Verify domain ownership

### Feedback Requests {#feedback-requests}

This archetype includes approvals and decision points that unblock vendor workflows. Tasks remain active until the customer reviews and confirms the asset or proposal. Examples of Feedback requests include:

* Approve site draft  
* Approve PR article draft  
* Approve campaign brief  
* Confirm business address

### Vendor Requests {#vendor-requests}

These tasks originate from vendor workflows. The Todo Engine acts as the communication bridge, surfacing vendor-side requests, tracking progress, and returning client responses automatically. Examples of vendor requests include:

* Provide additional information requested by vendor  
* Review and approve delivered assets  
* Confirm completion of delivered work  
* Design ready → awaiting client approval  
* Website draft ready for review  
* Ads campaign created → approval required  
* Review or feedback required  
* Launch or publish confirmation required  
* SSL activation pending

### Payments {#payments}

These tasks notify clients of issues that affect subscription continuity or product execution. While billing is handled by a separate engine, payment-related todos can still be displayed for client awareness and action. Examples of Payments archetype includes: 

* Pay / Approve invoice  
* Invoice pending action on failed invoice  
* Subscription payment failed  
* Subscription payment source expired  
* Credit card expiring  
* Add payment method  
* Update failed payment method

### System Alerts {#system-alerts}

For non-payment automated warnings such as following will be sent to the actor:

* DNS misconfiguration detected  
* OAuth token expired  
* Tracking pixel not firing  
* Google Ads disapproved ads  
* Email verification

## Todo Statuses {#todo-statuses}

| Todo Status | What does this mean? |
| ----- | ----- |
| Not Started | The task has been created but no work has begun yet. |
| Inprogress | Work is currently underway and the task is actively being handled. |
| Completed | All required work is finished and the task is fully done. |
| Cancelled | The task is intentionally stopped and will not be worked on further. |
| Snoozed | The task is temporarily paused and scheduled to resume later. |
| Reopened | Objectives of the todo are not met |

## Todo Intrinsic Priorities {#todo-intrinsic-priorities}

| Todo Priority | When does it apply | Scoring Weightage |
| ----- | ----- | ----- |
| Low | Nice-to-have tasks with minimal impact; can be scheduled later without consequences Ex: Providing optional brand guidelines (fonts, color codes, style guide) that are useful but not required to start running campaigns | 0.25 |
| Medium | Important tasks that support progress but do not block immediate workflow Ex: Upload a logo | 0.5 |
| High | Time-sensitive or blocking tasks that significantly impact delivery if delayed Ex: Admin access to website etc | 0.75 |
| Critical | Urgent, must-fix-immediately items that halt progress or cause major risk if not resolved Ex: Card expired for an ongoing project | 1.0 |

### 

## Priority scoring Rule {#priority-scoring-rule}

A priority scoring rule ensures that the Todo Engine surfaces the most important and time-sensitive tasks to the customer at the right moment. Since different todos vary in urgency, operational impact, and vendor dependency, a consistent scoring model allows the system to automatically rank tasks based on real business needs and ensures that critical items are completed first. 

| Input Factor | What is it? | Weightage |
| ----- | ----- | ----- |
| Intrinsic Priority of the Todo  | Reflects inherent importance based on todo type | 0.34 |
| Campaign or Project Status | Live initiatives amplify urgency because missing inputs may impact real-world performance. | 0.33 |
| Vendor SLA Proximity | Tasks tied to vendor deadlines require accelerated turnaround | 0.33 |

## Todo Properties {#todo-properties}

These items represent Todo Properties, as they describe the state, behavior, lifecycle, and execution context of each individual todo. These properties are essential for accurately tracking ownership, deadlines, workflow impact, customer experience, and project progress, enabling the Todo Engine to manage todos in a predictable, actionable, and automated manner.

| Todo Property | When does it apply |
| ----- | ----- |
| Target Actor | Who should it be surfaced for? Possible Actors Only agency Only Business Agency or Business Growbotik Internal Team |
| Source Actor | Who can trigger the creation of this todo System (Payments, OAuth token expiry etc) Vendor |
| Todo Status | Possible different states of todo. Open Inprogress Done |
| Intrinsic Priority | Intrinsic Priority of the todo |
| Blocking | Can it block the progression of the campaign / project? The system will try to figure out if the todo is blocking the progression of the project using LLM. If LLM’s decision is inconclusive, then the default is No Possible values \- Yes or No |
| Estimated Time to complete | Identifies how much time the user will have to spend to complete this todo.  Designed to encourage user engagement and completion of the todo The value will be in minutes |
| Due Date | Identifies whether the due date is applicable. In most cases, we will have a due date. But in some cases, where the todo is optional, raised by the system, and that can be dismissed, there won’t be a due date The default due date will be 48 hours and typically we will consider business hours.  |
| Requested Date | Date on which the todo was raised / requested |
| Completed date | Date on which the todo was completed |
| Cancelled Date | Date on which the todo was cancelled |

## 

## 

## Todo Configuration Properties for archetypes {#todo-configuration-properties-for-archetypes}

This sheet has the properties captured for each todo type.- [Todo Properties Sheet](https://docs.google.com/spreadsheets/d/1e1IbD8X3uAe6_lGXIP-yyeu-YsWFWkrbsYSxt3Xf8Ds/edit?gid=2068867812#gid=2068867812)

## High Level Stories {#high-level-stories}

| What is the story | Story Description | Reason for the sequence |
| ----- | ----- | ----- |
| Todo List | As a business user, I want to see a simple list of my todos so I can understand what actions are needed | Foundational UI/endpoint \- everything else (detail view, completion, prioritization) depends on having todos visible |
| Open Todo Detail View | As a business user, I want to open a todo and see what needs to be done so I can take the right action | Detail view is required before structured inputs, validation, submissions, and completion can work |
| Todo State Model  | As the system, I want todos to move through defined statuses so progress can be tracked consistently | State transitions power list separation, completion logic, reopened behavior, reminders, and filters |
| Mark Todo as Completed  | As a business user, I want to mark a todo as completed from inside the todo view so I can move work forward | Completion is the first “action loop” that proves the todo engine lifecycle end-to-end |
| Separate “Open” vs “Completed” Sections on UI | As a business user, I want to see a clear separation between open and completed todos so I can focus on what remains | Depends on statuses being implemented; improves usability before adding prioritization rules |
| Assign to Target Actor | As a Growbotik system, I want to assign the todo to the correct actor. (business, agency, internal team) | Used later for filtering, impersonation flows, and auditability |
| Show Source Actor	 | As an agency /  business / internal user, I want to see who created the todo so I understand context and urgency. | Required before vendor/system-specific todo behaviors |
| Blocking Flag Display | As a business user, I want to see whether a todo is blocking progress so I can prioritize correctly | Needed before priority sorting and “top 3” logic |
| Estimated Time to Complete | As a todo actor, I want to see the estimated time to complete each todo | Useful before introducing batching/top-3 |
| Due Date \+ Default SLA  | As the system, I want todos to have due dates (default 48 hours where applicable) so urgency and reminders can be driven consistently | Required for scoring (vendor SLA proximity) and later reminder/notification logic |
| Priority Sorting (Intrinsic Priority \+ Scoring Rule)	 | As the system, I want todos sorted by highest priority using the defined scoring rule so the most urgent tasks appear first | Sorting must exist before limiting to “top 3” and before “auto-reveal next” logic can be correct |
| Show Only Top 3 Todos \+ “X More to Go” Expand | As a business user, I want to see only the top three todos at a time (with “X more to go” expandable) so I’m not overwhelmed.	 | Depends on correct sorting and stable visibility rules (“already shown should not be hidden”). |
| Auto-Reveal Next Todo When One Is Completed | As the system, I want to automatically reveal the next highest-priority todo when one is completed so the customer progresses smoothly | Requires completion \+ priority sort \+ top-3 batching to already be working.  |
| Structured Form Fields in Todos (Text/Dropdown/Upload/Credentials) | As a business user, I want todos to contain structured form fields so I can submit required information in the right format | Backbone for archetypes (info requests, integrations) and must exist before validation and partial saves matter |
| Multi-Step Todo Forms \+ Progress Indicator  | As a business user, I want multi-step todos with progress indicators so long requests feel manageable | Builds directly on structured forms; required before “multi-session completion” is meaningful |
| Save Partial Progress \+ Resume | As a business user, I want partial progress saved while filling a todo so I can return later without losing work | Depends on multi-step form structure and state model; enables the spec’s multi-session requirement |
| Inline Validation \+ Field Guidance | As a business user, I want inline validation and helpful guidance for each field so I submit correct information the first time | Needs form fields; reduces rework before adding reviewer reject/reopen loops |
| Autofill Known Data \+ Confirmation  | As a business user, I want known customer/plan information pre-filled for confirmation so I don’t re-enter data across products | Uses the “collect once, propagate across products” |
| Vendor Request Todo: View Vendor Messages/Files \+ Respond | As a business user, I want vendor requests to appear as interactive todos (with vendor messages/files) so I can respond and unblock delivery | Depends on detail view \+ uploads \+ notes; this is the first “vendor-originated” todo category behavior |
| Feedback Request Todo: Approve vs Needs Changes | As a business user, I want to preview assets (drafts/ad copy/articles) and choose Approve or Needs Changes so vendors can proceed | Builds on vendor message/file support; adds structured decision capture.  |
| Integrations Todo: Show Connection Status | As a business user, I want to see integration connection status on a todo so I know whether I must retry or take action | Depends on structured todo type \+ states; required before adding “retry/fix” actions |
| System Alert Todos \+ Quick Fix/Retry Action | As a business user, I want alert-style todos (DNS misconfig, OAuth expiry, pixel not firing) with retry actions so I can resolve issues quickly. | Depends on integration/status patterns |
| Dashboard Summary \+ Filters (Blocking/Archetype) | As a business user, I want a summary of pending/completed/blocking todos and filters like “Blocking only” so I can manage work efficiently | Best done after core todo behaviors exist |
| Auto-Remove Todos for Cancelled Plans/Products | As the system, I want todos tied to cancelled plans/products to be removed automatically so users don’t work on irrelevant tasks | Requires linkage of todos to plan/product context; cleanup logic should come after the queue is functional |

	

| Story | Clickup Card |
| ----- | ----- |
| Show a simple list of todos for the user to complete | [https://app.clickup.com/t/86d17axyj](https://app.clickup.com/t/86d17axyj)  |
| Allow the user to open a todo and see what needs to be done | [https://app.clickup.com/t/86d17ayzu](https://app.clickup.com/t/86d17ayzu)  |
| Let the user mark a todo as completed from inside the todo view. |  |
| Show a clear separation between “Open” and “Completed” todos |  |
| Show who the todo is for (Business, Agency, Internal Team) |  |
| Show who created the todo (System, Vendor, Agency, Plan Executor). |  |
| Indicate whether a todo is blocking progress or not. |  |
| Show estimated time required to complete each todo |  |
| Show due dates for todos that have deadlines |  |
| Indicate whether a todo can be dismissed or not |  |
| Sort the todos by highest priority at the top of the list |  |
| Display only the top three todos at a time to reduce user overwhelm |  |
| Automatically reveal the next todo when one is completed |  |
| Allow todos to have structured forms (text, dropdowns, uploads, credentials, etc.) |  |
| Support multi-step forms inside a todo with progress indicators |  |
| Save partial progress as the user fills a todo. |  |
| Show inline validation and helpful guidance for each field |  |
| Autofill fields with known customer or plan information, showing them for confirmation |  |
| Support conditional questions that appear only when relevant |  |
| Show suggestions generated by AI for user confirmation (e.g., project short name). |  |
| Show that a previously completed todo has been reopened and needs changes |  |
| Allow users to view vendor comments or system notes explaining why it was reopened |  |
| Allow users to integrate external services (ex: GBP) |  |
| Allow the user to see connection status (connected, failed, retry, pending). |  |
| Allow users to preview assets (website draft, PR article, ad copy) and approve or request changes |  |
| Provide a simple “Approve / Needs Changes” interaction inside the todo |  |
| Present vendor questions or clarifications as interactive tasks to the customer |  |
| Show vendor-uploaded files or messages within the todo |  |
| Show alert-style todos for issues like DNS problems, OAuth expiry, or pixel tracking issues |  |
| Offer simple fixes or retry actions directly from the alert |  |
| Display payment-related todos (add card, update failed payment method, approve invoice) |  |
| Provide a secure and simple card entry UX |  |
| Show a dashboard-level summary of how many todos are pending, completed, or blocking |  |
| Offer filters such as “Blocking only”, “Information only”, or “Integrations only” |  |

# \=================================== {#===================================}

# 

