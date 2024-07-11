import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

function Chart() {
  return (
    <div className="max-container">
      <div className="flex flex-col items-center">
        <PieChart />
        <BarChart />
      </div>
    </div>
  );
}

export default Chart;
