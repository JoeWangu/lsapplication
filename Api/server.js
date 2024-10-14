const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:9000', }));
const PORT = process.env.PORT || 3000;

const customerRoutes = require('./routes/customerRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use(express.json());

// Use customer routes
app.use('/api/customers', customerRoutes);

// Use project routes
app.use('/api/projects', projectRoutes);


app.put('/api/customers/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const { name, email, address } = req.body;

        // Find the customer by ID
        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Update the customer data
        customer.name = name;
        customer.email = email;
        customer.address = address;
        await customer.save();

        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const { name, description, customerId } = req.body;

        // Find the project by ID
        const project = await Project.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update the project data
        project.name = name;
        project.description = description;
        project.customerId = customerId;
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
