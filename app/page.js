// Home page of the project
export default function Home() {
  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* Title */}
      <p>Please choose a part below:</p>
      {/*choose a part*/}

      <ul>
        <li>
          <a href="/part-a">Go to Part A</a>
        </li>
        <li>
          <a href="/part-b-c">Go to Part B and Part C</a>
        </li>
      </ul>
    </main>
  );
}