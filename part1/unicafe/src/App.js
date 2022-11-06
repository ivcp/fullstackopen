import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <td>
      {text} {value}
    </td>
  );
};

const Statistics = ({ good, bad, neutral, positive, average, all }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={all} />
          </tr>
          <tr>
            <StatisticLine text="average" value={average} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={positive} />
          </tr>
        </tbody>
      </table>
    </>
  );
};

const Button = ({ name, update }) => {
  return <button onClick={update}>{name}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + bad + neutral;
  const average = (good + bad + neutral) / 3;
  const positive = (good / all) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" update={() => setGood(good + 1)} />
      <Button name="neutral" update={() => setNeutral(neutral + 1)} />
      <Button name="bad" update={() => setBad(bad + 1)} />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
