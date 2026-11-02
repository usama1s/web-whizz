import { FLOW } from "../site.js";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap narrow center">
        <p className="eyebrow">404</p>
        <h1>This page doesn't exist.</h1>
        <p className="lead">It may have moved. Try one of these instead:</p>
        <div className="actions center">
          <a className="btn btn-primary" href="/">
            Web Whizz home
          </a>
          <a className="btn btn-ghost" href={FLOW.path}>
            {FLOW.name}
          </a>
        </div>
      </div>
    </section>
  );
}
