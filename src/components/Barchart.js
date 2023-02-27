import { Chart } from "react-google-charts";

const Barchart = ({ transactions }) => {
    const options = {
        title: "Spendings",
        titleTextStyle: {
            
            fontSize: 18, 
            
        },
        legend: { position: "none" },
    };
    let data = [
        ["Categoty", "Amount", { role: "style" }, { role: 'annotation' }],
    ]
    const hmap = new Map()
    const colors = ["#6929c4", "#9f1853", "#198038", "#ba4e00", "#1192e8", "#fa4d56", "#002d9c", "#009d9a", "#a56eff"]
    if (transactions) {
        transactions.map(item => {
            let category = item.category[0]
            let amount = Math.abs(parseFloat(item.amount))

            if (!hmap.get(category)) {
                hmap.set(category, amount)
            } else {
                hmap.set(category, hmap.get(category) + amount)
            }
        })
    }
    let i = 0
    for (let entry of hmap) {
        data.push([entry[0], entry[1], colors[i], '$' + entry[1]])
        i += 1
    }

    return (
        <div>
            <Chart
                chartType="ColumnChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>

    )
}

export default Barchart