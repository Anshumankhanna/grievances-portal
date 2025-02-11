type PieChartDataType = {
	name: string;
    color: string;
    portion: number;
}

export default function PieChart({ data }: { data: PieChartDataType[] }) {
	const values = data.reduce((accum: {
		color: string;
		portion: number;
	}[], curr) => {
		accum.push({
			color: curr.color,
			portion: curr.portion + (accum.at(-1)?.portion ?? 0)
		});

		return accum;
	}, []).map((elem, _, arr) => `${elem.color} 0 ${elem.portion / (arr.at(-1)?.portion ?? 1) * 100}%`);

	return (
		<figure className="flex flex-row place-content-center gap-8">
			<div style={{
				maxHeight: "auto",
				aspectRatio: "1",
				borderRadius: "50%",
				backgroundImage: `conic-gradient(
					from 90deg,
					${values.join(",")}
				)`
			}}></div>
			<figcaption className="flex flex-col justify-center gap-3">
				{data.map((elem, index) => (
					<span key={index} style={{
						color: elem.color
					}}>{elem.name}</span>
				))}
			</figcaption>
		</figure>
	)
}