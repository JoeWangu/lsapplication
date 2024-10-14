<!-- <template>
    <q-page class="q-pa-md">
        <div>
            <h2>Create Customer</h2>
            <q-form @submit="submitForm">
                <q-input v-model="customer.name" label="Name" required />
                <q-input v-model="customer.email" label="Email" required />
                <q-input v-model="customer.address" label="Address" required />
                <br>
                <q-btn label="Submit" type="submit" color="primary" :loading="loading" />
            </q-form>
        </div>
        <br>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <br>
        <q-table :rows="customers" :columns="columns" row-key="id" title="Customers List" />
        <q-btn label="Delete" color="negative" @click="deleteCustomer(row.id)" />
    </q-page>
</template> -->

<template>
    <q-page class="q-pa-md">
        <div>
            <h2>Create Customer</h2>
            <q-form @submit="submitForm">
                <q-input v-model="customer.name" label="Name" required />
                <q-input v-model="customer.email" label="Email" required />
                <q-input v-model="customer.address" label="Address" required />
                <br>
                <q-btn label="Submit" type="submit" color="primary" :loading="loading" />
            </q-form>
        </div>
        <br>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <br>
        <!-- <q-table :rows="customers" :columns="columns" row-key="id" title="Customers List">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn label="Delete" color="negative" @click="deleteCustomer(props.row.id)" />
                </q-td>
            </template>
        </q-table> -->
    </q-page>
</template>


<script lang="ts">
// import { defineComponent, reactive, ref, onMounted } from 'vue';
import { defineComponent, reactive,ref, onMounted } from 'vue';
import axios from 'axios';

interface Customer {
    id: number;
    name: string;
    email: string;
    address: string;
}

export default defineComponent({
    name: 'CustomerPage',
    setup() {
        const loading = ref(false);
        const errorMessage = ref('');
        const customer = reactive({
            name: '',
            email: '',
            address: '',
        });

        const customers = ref<Customer[]>([]);
        const columns = ref([
            { name: 'name', label: 'Name', field: 'name' },
            { name: 'email', label: 'Email', field: 'email' },
            { name: 'address', label: 'Address', field: 'address' },
            { name: 'actions', label: 'Actions', field: 'actions' },
        ]);

        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/customers');
                // console.log(response.data);
                customers.value = response.data as Customer[];
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        const submitForm = async () => {
            loading.value = true;
            try {
                const response = await axios.post('http://localhost:3000/api/customers', customer);
                console.log('Customer created:', response.data);
                fetchCustomers(); // Refresh the customer list after creation
            } catch (err) {
                const error = err as { response?: { data?: { message?: string } } };
                if (error.response && error.response.data) {
                    console.error('Validation error:', error.response.data);
                    errorMessage.value = error.response.data.message || 'An error occurred';
                }
            }
            // catch (error) {
            //     // console.error('Error creating customer:', error);
            //     console.error('Validation error:', error.response.data);
            //     // Display validation error in the UI
            //     errorMessage.value = error.response.data.message || 'An error occurred';
            // }
            finally {
                loading.value = false;
            }
        };

        const deleteCustomer = async (id: number) => {
            try {
                await axios.delete(`http://localhost:3000/api/customers/${id}`);
                // Refresh the customer list after deletion
                fetchCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        };


        onMounted(fetchCustomers);

        return {
            loading,
            customer,
            customers,
            columns,
            submitForm,
            deleteCustomer,
            errorMessage
        };
    },
});
</script>

<style>
.error-message {
    color: red;
}
</style>