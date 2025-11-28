import "./workflow.css";

export default function WorkflowSection() {
  return (
    <div className="workflow-section">
      <div className="workflow-wrapper">

        {/* LEFT SIDE */}
        <div className="workflow-left">
          <h1>
            Interactive human <br />
            resource workflow
          </h1>

          <p>
            Create application process faster with pre-screening tasks and
            assignments. This way you can identify committed applicants in
            an instant.
          </p>

          <button>Learn More</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="workflow-right">

          <div className="flow-card flow-small">
            Hiring days → <strong>25</strong>
          </div>

          <div className="flow-card">
            Job position created and published
          </div>

          <div className="flow-card">
            130 total applicant(s)
          </div>

          <div className="flow-card flow-yellow">
            Qualification Test
          </div>

          <div className="flow-purple">
            18 applicant(s) invited to <br /> interview session
          </div>

        </div>

      </div>
    </div>
  );
}
