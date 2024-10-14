<template>
    <q-page class="q-pa-md">
        <div>
            <!-- Define the table displaying projects -->
            <!-- <q-table :rows="projects" :columns="columns" row-key="id" title="Projects List" /> -->
            <!-- Display projects in a table -->
            <q-table :rows="projects" :columns="columns" row-key="id" title="Projects List">
                <template v-slot:body-cell-actions="props">
                    <q-btn @click="editProject(props.row)" label="Edit" />
                    <q-btn label="Delete" color="negative" @click="deleteProject(props.row.id)" />
                </template>
            </q-table>
            <br>
            <h2>Create Project</h2>
            <q-form @submit="submitForm">
                <q-input v-model="projectForm.name" label="Project Name" required />
                <q-input v-model="projectForm.description" label="Description" required />
                <q-select v-model="projectForm.customerId" :options="customers" option-value="id" option-label="name"
                label="Select Customer" required />
                <br>
                <q-btn label="Submit" type="submit" color="primary" :loading="loading" />
            </q-form>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>
    </q-page>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface Customer {
    id: number;
    name: string;
    // email: string;
    // address: string;
}

interface Project {
    id: number;
    name: string;
    description: string;
    customerId: number;
}

export default defineComponent({
    name: 'ProjectPage',
    setup() {
        // const projectForm = reactive({
        //     name: '',
        //     description: '',
        //     customerId: null,
        // });
        const projectForm = ref<Project>({
            id: 0,
            name: '',
            description: '',
            customerId: 1,
        });
        const loading = ref(false);
        const errorMessage = ref('');

        const projects = ref<Project[]>([]);
        const customers = ref<Customer[]>([]);
        // const customers = reactive<Customer[]>([]);

        const columns = ref([
            { name: 'name', label: 'Name', field: 'name' },
            { name: 'description', label: 'Description', field: 'description' },
            { name: 'customerId', label: 'Customer ID', field: 'customerId' },
            { name: 'actions', label: 'Action', field: 'actions' },
        ]);

        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/customers');
                // console.log(response.data);
                // customers.splice(0, customers.length, ...response.data);
                customers.value = response.data as Customer[];
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/projects');
                // console.log(response.data);
                projects.value = response.data as Project[];
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        const editProject = (projectToEdit: Project) => {
            projectForm.value = { ...projectToEdit };  // Populate the form with selected project data
        };

        const submitForm = async () => {
            loading.value = true;
            try {
                if (projectForm.value.id) {
                    await axios.put(`http://localhost:3000/api/projects/${projectForm.value.id}`, projectForm.value);
                    // console.log('Submitting Project:', project.value);
                } else {
                    await axios.post('http://localhost:3000/api/projects', projectForm.value);
                    // console.log('Submitting Project:', projectForm.value);

                }
                projectForm.value = { id: 0, name: '', description: '', customerId: 1 };
                fetchProjects(); // Refresh the project list after creation
            } catch (err) {
                const error = err as { response?: { data?: { message?: string } } };
                if (error.response && error.response.data) {
                    console.error('Validation error:', error.response.data);
                    errorMessage.value = error.response.data.message || 'An error occurred';
                }
            } finally {
                loading.value = false;
            }
        };


        const deleteProject = async (id: number) => {
            try {
                await axios.delete(`http://localhost:3000/api/projects/${id}`);
                // Refresh the customer list after deletion
                fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        };

        onMounted(() => {
            fetchCustomers();
            fetchProjects();
        });

        return {
            projectForm,
            projects,
            customers,
            columns,
            submitForm,
            editProject,
            deleteProject,
            loading,
            errorMessage
        };
    },
});
// const submitForm = async () => {
//     try {
//         const response = await axios.post('http://localhost:3000/api/projects', project);
//         console.log('Project created:', response.data);
//         fetchProjects(); // Refresh the project list after creation
//     } catch (error) {
//         console.error('Error creating project:', error);
//     }
// };
</script>