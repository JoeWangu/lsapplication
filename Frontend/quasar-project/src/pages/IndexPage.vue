<template>
  <q-page class="q-pa-sm">
    <div>
      <q-table :rows="customers" :columns="columns" row-key="id" title="Customers List"
        :rows-per-page-options="[7, 10, 20]" :rows-per-page="7">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn @click="editCustomer(props.row)" label="Edit" />
            <q-btn label="Delete" color="negative" @click="deleteCustomer(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- <br><br> -->
  </q-page>
  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  <q-footer>
    <q-form @submit="submitForm" class="row q-pa-sm q-col-gutter-md shadow-up-3">
      <div class="col">
        <q-input outlined v-model="customerForm.name" placeholder="Name" bg-color="white" dense />
      </div>
      <div class="col">
        <q-input outlined v-model="customerForm.email" placeholder="Email" bg-color="white" dense />
      </div>
      <div class="col">
        <q-input outlined v-model="customerForm.address" placeholder="Address" bg-color="white" dense />
      </div>
      <div class="col">
        <q-btn color="accent" icon="add" round :loading="loading" type="submit" />
      </div>
    </q-form>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
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
    // const customerForm = reactive({
    //   name: '',
    //   email: '',
    //   address: '',
    // });
    // const submitFormDefault = {
    //   name: '',
    //   email: '',
    //   address: '',
    // };
    // const customerForm = reactive({
    //   ...submitFormDefault
    // });
    const customerForm = ref<Customer>({
      id: 0,
      name: '',
      email: '',
      address: ''
    });

    const customers = ref<Customer[]>([]);
    const columns = ref([
      { name: 'name', label: 'Name', field: 'name' },
      { name: 'email', label: 'Email', field: 'email' },
      { name: 'address', label: 'Address', field: 'address' },
      { name: 'actions', label: 'Actions', field: 'actions' },
    ]);

    const editCustomer = (customerToEdit: Customer) => {
      customerForm.value = { ...customerToEdit };  // Populate the form with selected customer data
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/customers');
        // console.log(response.data);
        customers.value = response.data as Customer[];
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    // const submitFormReset = () => {
    //   Object.assign(customerForm, submitFormDefault)
    // };

    // const editForm = async () => {
    //   if (customer.value.id) {
    //     // Update existing customer
    //     await axios.put(`http://localhost:3000/api/customers/${customer.value.id}`, customer.value);
    //   } else {
    //     // Create a new customer (if needed)
    //   }
    //   await fetchCustomers();  // Refresh customer list
    //   customer.value = { id: null, name: '', email: '', address: '' };  // Reset form
    // };

    const submitForm = async () => {
      loading.value = true;
      try {
        if (customerForm.value.id) {
          // Update existing customer
          await axios.put(`http://localhost:3000/api/customers/${customerForm.value.id}`, customerForm.value);
        } else {
          // Create a new customer (if needed)
          await axios.post('http://localhost:3000/api/customers', customerForm.value);
          // console.log('Customer created:', response.data);
        }
        // submitFormReset();
        customerForm.value = { id: 0, name: '', email: '', address: '' };
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
      customerForm,
      customers,
      columns,
      submitForm,
      deleteCustomer,
      errorMessage,
      editCustomer
    };
  },
});
</script>

<style lang="scss" scoped></style>



































<!-- <template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';

defineOptions({
  name: 'IndexPage'
});

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
]);

const meta = ref<Meta>({
  totalCount: 1200
});
</script> -->
