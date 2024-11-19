import { Payment, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ExtendedColumnDef } from "@/app/lib/extensions";
import FilterComponent from "@/components/ui/datatabe_comp/filter-table";
async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
	return [
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
		},
		{
			id: "b3f29d1a",
			amount: 50,
			status: "success",
			email: "john.doe@example.com",
		},
		{
			id: "e82b8a3d",
			amount: 200,
			status: "failed",
			email: "alice@yahoo.com",
		},
		{
			id: "f8d1c2e4",
			amount: 75,
			status: "pending",
			email: "bob@hotmail.com",
		},
		{
			id: "c4d9e3b2",
			amount: 300,
			status: "processing",
			email: "carol@example.com",
		},
		{
			id: "a9e4c3d1",
			amount: 150,
			status: "success",
			email: "dave@outlook.com",
		},
		{
			id: "d2c8a9b5",
			amount: 90,
			status: "failed",
			email: "eva@gmail.com",
		},
		{
			id: "e3b7c1a4",
			amount: 120,
			status: "pending",
			email: "frank@yahoo.com",
		},
		{
			id: "f5a8b2c7",
			amount: 60,
			status: "processing",
			email: "george@hotmail.com",
		},
		{
			id: "g1c2a9d4",
			amount: 180,
			status: "success",
			email: "hannah@example.com",
		},
		{
			id: "h9b2c4a1",
			amount: 210,
			status: "failed",
			email: "ian@example.com",
		},
		{
			id: "i4c9b1a7",
			amount: 130,
			status: "pending",
			email: "jessica@gmail.com",
		},
		{
			id: "j8b1a4c2",
			amount: 85,
			status: "processing",
			email: "kevin@yahoo.com",
		},
		{
			id: "k7a2c8b1",
			amount: 250,
			status: "success",
			email: "lisa@hotmail.com",
		},
	];
}

export default async function DemoPage() {
	const data = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
