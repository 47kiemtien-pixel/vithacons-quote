export const fallbackPackages = [
    {
        id: 1,
        package_code: 'ECO',
        name: 'Gói Tiết Kiệm (Eco)',
        base_price: 4500000,
        description: 'Tối ưu hóa chủng loại vật tư để đạt hiệu quả kinh tế cao nhất nhưng vẫn đảm bảo độ bền kết cấu.',
        is_multi_story: false,
        image_url: '/images/eco.png',
        materials: {
            columns: "Hệ cột sắt hộp",
            walls: "Hệ tường bằng tấm Cemboard 2 lớp",
            roof: "Mái tole liên doanh cách nhiệt",
            doors: "Hệ cửa nhôm thường",
            floor: "Nền gạch men thường",
            sanitary: "Thiết bị vệ sinh China",
            electrical: "Dây điện Cadisun, thiết bị điện China",
            water: "Ống nước thường"
        }
    },
    {
        id: 2,
        package_code: 'STANDARD_L4',
        name: 'Nhà Cấp 4 - Tiêu Chuẩn',
        base_price: 5600000,
        description: 'Giải pháp hoàn thiện trọn gói chìa khóa trao tay, mang lại không gian sống tiện nghi, bền bỉ với chi phí hợp lý nhất.',
        is_multi_story: false,
        image_url: '/images/standard.png',
        materials: {
            columns: "Hệ cột sắt hộp",
            walls: "Hệ tường bằng tấm Cemboard 2 lớp",
            roof: "Mái tole cách nhiệt",
            doors: "Hệ cửa nhôm kính xingfa",
            floor: "Nền gạch men bóng kiếng 2 da",
            sanitary: "Thiết bị vệ sinh Viglacera",
            electrical: "Thiết bị điện Panasonic",
            water: "Ống nước Tiền phong, bồn nước Sơn Hà"
        }
    },
    {
        id: 3,
        package_code: 'PREMIUM_L4',
        name: 'Nhà Cấp 4 - Cao Cấp',
        base_price: 6200000,
        description: 'Sử dụng hệ vật liệu cao cấp chuẩn Âu, kiến tạo không gian sống đẳng cấp, sang trọng vượt thời gian cùng kết cấu siêu bền.',
        is_multi_story: false,
        image_url: '/images/premium.png',
        materials: {
            columns: "Thép định hình chữ I, H",
            walls: "Hệ tường gạch bê tông chưng áp AAC",
            roof: "Mái tole cách nhiệt dày, chống ồn",
            ceiling: "Trần thạch cao phẳng khung chìm Vĩnh Tường",
            doors: "Hệ cửa nhôm kính xingfa nhập khẩu",
            floor: "Nền gạch men bóng kiếng 2 da cao cấp",
            sanitary: "Thiết bị vệ sinh Viglacera/Toto",
            electrical: "Thiết bị điện Panasonic/Schneider",
            water: "Ống nước Tiền phong, bồn nước Sơn Hà"
        }
    },
    {
        id: 4,
        package_code: 'MULTI_STORY',
        name: 'Nhà Tấm 2, 3, 4 Tầng...',
        base_price: 6650000,
        description: 'Hệ kết cấu thép chịu lực cường độ cao, thiết kế chuyên biệt đảm bảo an toàn tuyệt đối và tối ưu không gian cho công trình nhiều tầng.',
        is_multi_story: true,
        image_url: '/images/multistory.png',
        materials: {
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
        }
    }
];

export const calculateQuoteLocally = (area, packageDetails, floors = 1) => {
    let totalArea = parseFloat(area);
    if (packageDetails.is_multi_story) {
        totalArea = totalArea * parseInt(floors, 10);
    }

    let totalPrice = totalArea * packageDetails.base_price;
    let formattedPrice = '';

    if (packageDetails.package_code === 'MULTI_STORY') {
        const minPrice = totalArea * 6500000;
        const maxPrice = totalArea * 6800000;
        formattedPrice = `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(minPrice)} - ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(maxPrice)}`;
    } else {
        formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
    }

    return {
        quote: {
            totalArea,
            totalPrice,
            formattedPrice,
            package: packageDetails
        }
    };
};
