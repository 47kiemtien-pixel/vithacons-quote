const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Get all available packages
app.get('/api/packages', (req, res) => {
    db.all('SELECT * FROM packages', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Parse materials JSON string back to object
        const packages = rows.map(row => ({
            ...row,
            materials: JSON.parse(row.materials),
            is_multi_story: Boolean(row.is_multi_story)
        }));
        res.json(packages);
    });
});

// Calculate quote based on area and packageId
app.post('/api/quote', (req, res) => {
    const { area, packageId, floors = 1 } = req.body;

    if (!area || !packageId) {
        return res.status(400).json({ error: 'Area and packageId are required parameters' });
    }

    db.get('SELECT * FROM packages WHERE id = ?', [packageId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            return res.status(404).json({ error: 'Package not found' });
        }

        const packageDetails = {
            ...row,
            materials: JSON.parse(row.materials),
            is_multi_story: Boolean(row.is_multi_story)
        };

        let totalArea = parseFloat(area);
        if (packageDetails.is_multi_story) {
            totalArea = totalArea * parseInt(floors, 10);
        }

        const totalPrice = totalArea * packageDetails.base_price;

        res.json({
            quote: {
                totalArea,
                totalPrice,
                formattedPrice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice),
                package: packageDetails
            }
        });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
