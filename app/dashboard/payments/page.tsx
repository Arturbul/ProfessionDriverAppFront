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
			createdAt: new Date("2024-11-01T10:00:00Z"),
		},
		{
			id: "489e1d42",
			amount: 125,
			status: "processing",
			email: "example@gmail.com",
			createdAt: new Date("2024-11-02T14:30:00Z"),
		},
		{
			id: "b3f29d1a",
			amount: 50,
			status: "success",
			email: "john.doe@example.com",
			createdAt: new Date("2024-11-03T09:15:00Z"),
		},
		{
			id: "e82b8a3d",
			amount: 200,
			status: "failed",
			email: "alice@yahoo.com",
			createdAt: new Date("2024-11-04T08:45:00Z"),
		},
		{
			id: "f8d1c2e4",
			amount: 75,
			status: "pending",
			email: "bob@hotmail.com",
			createdAt: new Date("2024-11-05T12:00:00Z"),
		},
		{
			id: "c4d9e3b2",
			amount: 300,
			status: "processing",
			email: "carol@example.com",
			createdAt: new Date("2024-11-06T13:45:00Z"),
		},
		{
			id: "a9e4c3d1",
			amount: 150,
			status: "success",
			email: "dave@outlook.com",
			createdAt: new Date("2024-11-07T15:30:00Z"),
		},
		{
			id: "d2c8a9b5",
			amount: 90,
			status: "failed",
			email: "eva@gmail.com",
			createdAt: new Date("2024-11-08T16:15:00Z"),
		},
		{
			id: "e3b7c1a4",
			amount: 120,
			status: "pending",
			email: "frank@yahoo.com",
			createdAt: new Date("2024-11-09T18:20:00Z"),
		},
		{
			id: "f5a8b2c7",
			amount: 60,
			status: "processing",
			email: "george@hotmail.com",
			createdAt: new Date("2024-11-10T20:10:00Z"),
		},
		{
			id: "g1c2a9d4",
			amount: 180,
			status: "success",
			email: "hannah@example.com",
			createdAt: new Date("2024-11-11T22:05:00Z"),
		},
		{
			id: "h9b2c4a1",
			amount: 210,
			status: "failed",
			email: "ian@example.com",
			createdAt: new Date("2024-11-12T23:50:00Z"),
		},
		{
			id: "i4c9b1a7",
			amount: 130,
			status: "pending",
			email: "jessica@gmail.com",
			createdAt: new Date("2024-11-13T07:10:00Z"),
		},
		{
			id: "j8b1a4c2",
			amount: 85,
			status: "processing",
			email: "kevin@yahoo.com",
			createdAt: new Date("2024-11-14T05:30:00Z"),
		},
		{
			id: "k7a2c8b1",
			amount: 250,
			status: "success",
			email: "lisa@hotmail.com",
			createdAt: new Date("2024-11-15T03:20:00Z"),
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
