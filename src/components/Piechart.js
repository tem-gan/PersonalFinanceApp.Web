import { Chart } from "react-google-charts";

const Piechart = ({ transactions }) => {
    const options = {
        title: "Distribution",
        titleTextStyle: {
            
            fontSize: 18, 
            
        },
        colors: ["#6929c4", "#9f1853", "#198038", "#ba4e00", "#1192e8", "#fa4d56", "#002d9c", "#009d9a", "#a56eff"],
        legend: { position: 'left', },
    };
    let data = [
        ["Categoty", "Amount"]
    ]
    const hmap = new Map()
    if (transactions) {
        transactions.forEach(item => {
            let category = item.category[0]
            let amount = Math.abs(parseFloat(item.amount))

            if (!hmap.get(category)) {
                hmap.set(category, amount)
            } else {
                hmap.set(category, hmap.get(category) + amount)
            }

        })
    }

    return (
        <div>
            <Chart
                chartType="PieChart"
                data={data.concat(Array.from(hmap))}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>

    )
}

export default Piechart