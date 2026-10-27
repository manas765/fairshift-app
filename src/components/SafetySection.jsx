
function SafetySection() {
  function handleSafetyClick() {
    alert(
      "The secure safety-report form will be built in a later phase."
    );
  }

  return (
    <section className="safety-section" id="safety">
      <div>
        <span className="eyebrow">SPEAK UP</span>

        <h2>A safer workplace starts with being heard.</h2>

        <p>
          FairShift aims to make workplace concerns easier to raise.
          This preview does not transmit or store reports.
        </p>
      </div>

      <button className="primary-button" onClick={handleSafetyClick}>
        Explore safety reporting →
      </button>
    </section>
  );
}

export default SafetySection;
