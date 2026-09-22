export function CodeBlock() {
  return (
    <div className="gk-code">
      <div>
        <span className="gk-code__prompt">$</span> npm i gouache-kit
      </div>
      <div className="gk-code__comment"># one texture file, nine elements</div>
      <div className="gk-code__gap" />
      <div>
        <span className="gk-code__keyword">import</span> {'{ Button, Plate }'}{' '}
        <span className="gk-code__keyword">from</span> <span className="gk-code__string">'gouache-kit'</span>
      </div>
      <div>
        &lt;Button tone=<span className="gk-code__string">"gouache"</span>&gt;Ship it&lt;/Button&gt;
      </div>
    </div>
  );
}
