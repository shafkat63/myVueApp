<template>
    <div class="p-4 flex flex-row ">
        <button
			@click="openModal"
			class="new-order-button bg-green-500 text-white py-2 px-4 rounded mb-4 m-2  hover:bg-green-600"
		>
			New
		</button>
        <button
			@click="downloadPDF"
			class="bg-red-500 text-white py-2 px-4 rounded mb-4 m-2 hover:bg-red-600"
		>
			Download PDF
		</button>
    </div>
	<div class="purchase-order-table p-4">
		

		<!-- Modal for creating a new purchase order -->
		<div
			v-if="isModalOpen"
			class="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
		>
			<div
				class="modal-content bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3"
			>
				<h2 class="text-2xl font-semibold text-center mb-4">
					Create New Purchase Order
				</h2>

				<form @submit.prevent="createOrder">
					<div class="mb-4">
						<label class="block text-gray-700 mb-1">Purchase Order No:</label>
						<input
							v-model="newOrder.purchaseOrderNo"
							required
							class="input border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							placeholder="Enter Order No"
						/>
					</div>

					<div class="mb-4">
						<label class="block text-gray-700 mb-1">Purchase Date:</label>
						<input
							type="date"
							v-model="newOrder.purchaseDate"
							required
							class="input border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						/>
					</div>

					<div class="flex flex-col md:flex-row gap-2">
						<div class="mb-4 w-full md:w-1/2">
							<label class="block text-gray-700 mb-1">Supplier:</label>
							<input
								v-model="newOrder.supplier"
								required
								class="input border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
								placeholder="Enter Supplier Name"
							/>
						</div>

						<div class="mb-4 w-full md:w-1/2">
							<label class="block text-gray-700 mb-1">Consignee:</label>
							<input
								v-model="newOrder.consignee"
								required
								class="input border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
								placeholder="Enter Consignee Name"
							/>
						</div>
					</div>

					<div class="mb-4">
						<label class="block text-gray-700 mb-1">Purchase Type:</label>
						<select
							v-model="newOrder.purchaseType"
							required
							class="input border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						>
							<option value="Standard">Standard</option>
							<option value="Urgent">Urgent</option>
							<option value="Bulk">Bulk</option>
						</select>
					</div>

					<div class="mb-4">
						<label class="block text-gray-700 mb-1">Store:</label>
						<input
							v-model="newOrder.store"
							required
							class="input border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							placeholder="Enter Store Name"
						/>
					</div>

					<div class="mb-4">
						<label class="block text-gray-700 mb-1">Status:</label>
						<select
							v-model="newOrder.status"
							required
							class="input border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						>
							<option value="Pending">Pending</option>
							<option value="Completed">Completed</option>
						</select>
					</div>

					<div class="flex justify-between mt-6">
						<button
							type="submit"
							class="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition"
						>
							Create Order
						</button>
						<button
							type="button"
							@click="closeModal"
							class="bg-gray-300 text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-400 transition"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>

		<input
			v-model="searchQuery"
			placeholder="Search Purchase Orders..."
			class="search-input mb-4 w-full p-2 border border-gray-300 rounded"
		/>

		<table class="table-auto w-full border-collapse">
			<thead>
				<tr class="bg-gray-200">
					<th class="border p-2">S/N</th>
					<th class="border p-2">Purchase Order No.</th>
					<th class="border p-2">Purchase Date</th>
					<th class="border p-2">Supplier</th>
					<th class="border p-2">Consignee</th>
					<th class="border p-2">Purchase Type</th>
					<th class="border p-2">Store</th>
					<th class="border p-2">Status</th>
					<th class="border p-2">Action</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row, index) in filteredData"
					:key="index"
					class="even:bg-gray-100"
				>
					<td class="border p-2">
						{{ index + 1 + (currentPage - 1) * perPage }}
					</td>
					<td class="border p-2">{{ row.purchaseOrderNo }}</td>
					<td class="border p-2">{{ row.purchaseDate }}</td>
					<td class="border p-2">{{ row.supplier }}</td>
					<td class="border p-2">{{ row.consignee }}</td>
					<td class="border p-2">{{ row.purchaseType }}</td>
					<td class="border p-2">{{ row.store }}</td>
					<td class="border p-2">{{ row.status }}</td>
					<td class="border p-2">
						<button
							@click="editRow(row)"
							class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
						>
							Edit
						</button>
					</td>
				</tr>
			</tbody>
		</table>

		<div class="pagination mt-4 text-center">
			<button
				@click="prevPage"
				:disabled="currentPage === 1"
				class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Previous
			</button>
			<span class="px-4">Page {{ currentPage }} of {{ totalPages }}</span>
			<button
				@click="nextPage"
				:disabled="currentPage === totalPages"
				class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Next
			</button>
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
	setup() {
		const rows = ref([]);
		const perPage = ref(10);
		const currentPage = ref(1);
		const totalPages = ref(0);
		const searchQuery = ref(""); // Add search query
		const isModalOpen = ref(false); // Track modal state
		const newOrder = ref({
			purchaseOrderNo: "",
			purchaseDate: "",
			supplier: "",
			consignee: "",
			purchaseType: "Standard", // Add purchaseType with default value
			store: "", // Add store field
			status: "Pending",
		});

		const fetchData = async () => {
			try {
				const response = await fetch("/purchaseOrders.json");
				const data = await response.json();
				rows.value = data;
				totalPages.value = Math.ceil(data.length / perPage.value);
			} catch (error) {
				console.error("Error fetching JSON data:", error);
			}
		};

        const downloadPDF = () => {
			const element = document.querySelector("table");
			html2canvas(element).then((canvas) => {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new jsPDF({
					orientation: "portrait",
					unit: "pt",
					format: "a4",
				});
				const imgProps = pdf.getImageProperties(imgData);
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
				pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
				pdf.save("purchase-orders.pdf");
			});
		};

		onMounted(() => {
			fetchData();
		});

		// Open and close modal
		const openModal = () => {
			isModalOpen.value = true;
		};

		const closeModal = () => {
			isModalOpen.value = false;
			resetNewOrder();
		};

		const resetNewOrder = () => {
			newOrder.value = {
				purchaseOrderNo: "",
				purchaseDate: "",
				supplier: "",
				consignee: "",
				purchaseType: "Standard", // Reset purchaseType
				store: "", // Reset store
				status: "Pending",
			};
		};

		// Function to create a new order
		const createOrder = () => {
			// Push the new order to the rows array
			rows.value.push({ ...newOrder.value });

			// Update total pages
			totalPages.value = Math.ceil(rows.value.length / perPage.value);

			// Close the modal and reset form
			closeModal();
		};

		// Computed property for filtered data
		const filteredData = computed(() => {
			// If no search query, return all rows
			if (!searchQuery.value) {
				return paginatedData.value;
			}
			// Filter rows based on search query (case insensitive)
			return paginatedData.value.filter((row) => {
				return (
					row.purchaseOrderNo
						.toLowerCase()
						.includes(searchQuery.value.toLowerCase()) ||
					row.supplier
						.toLowerCase()
						.includes(searchQuery.value.toLowerCase()) ||
					row.consignee
						.toLowerCase()
						.includes(searchQuery.value.toLowerCase()) ||
					row.purchaseType
						.toLowerCase()
						.includes(searchQuery.value.toLowerCase()) || // Include purchaseType in search
					row.store.toLowerCase().includes(searchQuery.value.toLowerCase()) || // Include store in search
					row.status.toLowerCase().includes(searchQuery.value.toLowerCase())
				);
			});
		});

		const paginatedData = computed(() => {
			const start = (currentPage.value - 1) * perPage.value;
			const end = currentPage.value * perPage.value;
			return rows.value.slice(start, end);
		});

		const prevPage = () => {
			if (currentPage.value > 1) currentPage.value--;
		};

		const nextPage = () => {
			if (currentPage.value < totalPages.value) currentPage.value++;
		};

		const editRow = (row) => {
			console.log("Editing row", row);
		};

		return {
			rows,
			perPage,
			currentPage,
			totalPages,
			paginatedData,
			filteredData,
			prevPage,
			nextPage,
			editRow,
			searchQuery,
			isModalOpen,
			openModal,
			closeModal,
			newOrder,
			createOrder,
            downloadPDF,
		};
	},
};
</script>

<style scoped>
.modal-content {
	max-height: 90vh; /* Prevents the modal from exceeding viewport height */
	overflow-y: auto; /* Allows scrolling if the content is too long */
}
</style>
