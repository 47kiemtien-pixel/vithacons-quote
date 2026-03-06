const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'vithacon_quote.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS packages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        package_code TEXT UNIQUE,
        name TEXT,
        base_price INTEGER,
        description TEXT,
        materials JSON,
        is_multi_story BOOLEAN DEFAULT 0,
        image_url TEXT
      )`);

            // Seed data
            const packages = [
                {
                    code: 'ECO',
                    name: 'Gói Tiết Kiệm (Eco)',
                    base_price: 4500000,
                    description: 'Vật tư sẽ giảm chất lượng 1 chút để tiết kiệm chi phí tối đa.',
                    is_multi_story: 0,
                    image_url: '/images/eco.png',
                    materials: JSON.stringify({
                        columns: "Hệ cột sắt hộp",
                        walls: "Hệ tường bằng tấm Cemboard 2 lớp",
                        roof: "Mái tole liên doanh cách nhiệt",
                        doors: "Hệ cửa nhôm thường",
                        floor: "Nền gạch men thường",
                        sanitary: "Thiết bị vệ sinh China",
                        electrical: "Dây điện Cadisun, thiết bị điện China",
                        water: "Ống nước thường"
                    })
                },
                {
                    code: 'STANDARD_L4',
                    name: 'Nhà Cấp 4 - Tiêu Chuẩn',
                    base_price: 5600000,
                    description: 'Hoàn thiện chìa khóa trao tay.',
                    is_multi_story: 0,
                    image_url: '/images/standard.png',
                    materials: JSON.stringify({
                        columns: "Hệ cột sắt hộp",
                        walls: "Hệ tường bằng tấm Cemboard 2 lớp",
                        roof: "Mái tole cách nhiệt",
                        doors: "Hệ cửa nhôm kính xingfa",
                        floor: "Nền gạch men bóng kiếng 2 da",
                        sanitary: "Thiết bị vệ sinh Viglacera",
                        electrical: "Thiết bị điện Panasonic",
                        water: "Ống nước Tiền phong, bồn nước Sơn Hà"
                    })
                },
                {
                    code: 'PREMIUM_L4',
                    name: 'Nhà Cấp 4 - Cao Cấp',
                    base_price: 6200000,
                    description: 'Vật tư cao cấp, hệ kết cấu chắc chắn hơn.',
                    is_multi_story: 0,
                    image_url: '/images/premium.png',
                    materials: JSON.stringify({
                        columns: "Thép định hình chữ I, H",
                        walls: "Hệ tường gạch bê tông chưng áp AAC",
                        roof: "Mái tole cách nhiệt dày, chống ồn",
                        ceiling: "Trần thạch cao phẳng khung chìm Vĩnh Tường",
                        doors: "Hệ cửa nhôm kính xingfa nhập khẩu",
                        floor: "Nền gạch men bóng kiếng 2 da cao cấp",
                        sanitary: "Thiết bị vệ sinh Viglacera/Toto",
                        electrical: "Thiết bị điện Panasonic/Schneider",
                        water: "Ống nước Tiền phong, bồn nước Sơn Hà"
                    })
                },
                {
                    code: 'MULTI_STORY',
                    name: 'Nhà Tấm 2, 3, 4 Tầng...',
                    base_price: 6650000, // Average 6.5 - 6.8
                    description: 'Kết cấu thép chịu lực cao cho nhà nhiều tầng.',
                    is_multi_story: 1,
                    image_url: '/images/multistory.png',
                    materials: JSON.stringify({
                        columns: "Thép định hình chữ I, H nguyên khối",
                        beams: "Dầm thép I, H",
                        floor_slab: "Sàn Deck / Tấm Cemboard chịu lực",
                        walls: "Hệ tường gạch bê tông chưng áp AAC",
                        roof: "Mái tole cách nhiệt / Sàn mái bê tông nhẹ",
                        ceiling: "Trần thạch cao phẳng khung chìm Vĩnh Tường",
                        doors: "Hệ cửa nhôm kính xingfa nhập khẩu",
                        floor: "Nền gạch men bóng kiếng cao cấp / Sàn gỗ",
                        sanitary: "Thiết bị vệ sinh cao cấp",
                        electrical: "Thiết bị điện Panasonic/Schneider",
                        water: "Hệ thống cấp thoát nước chuẩn kỹ thuật"
                    })
                }
            ];

            const stmt = db.prepare(`INSERT OR IGNORE INTO packages (package_code, name, base_price, description, materials, is_multi_story, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)`);
            for (const p of packages) {
                stmt.run(p.code, p.name, p.base_price, p.description, p.materials, p.is_multi_story, p.image_url);
            }
            stmt.finalize();
        });
    }
});

module.exports = db;
