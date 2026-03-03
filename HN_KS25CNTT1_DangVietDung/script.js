let student_list = [
    { ID: "001", name: "Nguyễn Minh Hiển", math: 9, literature: 7, english: 7, avg: 7.67 },
    { ID: "002", name: "Quách Trần Anh", math: 8, literature: 8, english: 10, avg: 8.67 },
    { ID: "003", name: "Vũ Lê Minh Hiếu", math: 9, literature: 7, english: 8, avg: 8 },
    { ID: "004", name: "Hà Đức Minh", math: 8, literature: 8, english: 9, avg: 8.33 },
    { ID: "005", name: "Nguyễn Tấn Dũng", math: 8, literature: 7, english: 8, avg: 7.67 }
];

const show_list = () => {
    student_list.forEach(student => {
        console.log(`${student.ID} - ${student.name} - ${student.math} - ${student.literature} - ${student.english} - ${student.avg.toFixed(2)}`);
    });
}

const add_student = () => {
    let ID = prompt("Nhập ID sinh viên: ");

    if (!ID) {
        alert("ID không được để trống!");
        return;
    }

    let check_ID = student_list.find(student => student.ID === ID);
    if (check_ID) {
        alert("ID đã tồn tại, vui lòng chọn ID khác.");
        return;
    }

    let name = prompt("Nhập tên sinh viên: ").trim();
    if (!name) {
        alert("Tên sinh viên không được để trống.");
        return;
    }

    let math = Number(prompt("Nhập điểm toán: "));
    let literature = Number(prompt("Nhập điểm văn: "));
    let english = Number(prompt("Nhập điểm anh: "));

    if (isNaN(math) || isNaN(literature) || isNaN(english) || math < 0 || math > 10 || literature < 0 || literature > 10 || english < 0 || english > 10) {
        alert("Điểm các môn phải là số từ 0 đến 10.");
        return;
    }

    let avg = (math + literature + english) / 3;

    student_list.push({
        ID,
        name,
        math,
        literature,
        english,
        avg
    });

    alert(`Đã thêm sinh viên: ${name}`);
}

const delete_student = () => {
    let ID = prompt("Nhập ID sinh viên cần xóa: ");

    let index = student_list.findIndex(student => student.ID === ID);
    if (index === -1) {
        alert("Mã sinh viên không tồn tại");
        return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
        student_list.splice(index, 1);
        alert("Xóa sinh viên thành công!");
    }
}

const update_student = () => {
    let ID = prompt("Nhập ID sinh viên cần cập nhật: ");

    let student = student_list.find(student => student.ID === ID);
    if (!student) {
        alert("Mã sinh viên không tồn tại!");
        return;
    }

    let new_name = prompt("Nhập tên mới: ").trim();
    if (!new_name) {
        alert("Tên sinh viên không được để trống.");
        return;
    }

    let new_math = Number(prompt("Nhập điểm toán mới: "));
    let new_literature = Number(prompt("Nhập điểm văn mới: "));
    let new_english = Number(prompt("Nhập điểm anh mới: "));

    if (isNaN(new_math) || isNaN(new_literature) || isNaN(new_english) || new_math < 0 || new_math > 10 || new_literature < 0 || new_literature > 10 || new_english < 0 || new_english > 10) {
        alert("Điểm các môn phải là số từ 0 đến 10.");
        return;
    }

    student.name = new_name;
    student.math = new_math;
    student.literature = new_literature;
    student.english = new_english;
    student.avg = (new_math + new_literature + new_english) / 3;

    alert(`Đã cập nhật sinh viên: ${new_name}`);
}

const find_student = () => {
    let search_type = prompt("Tìm theo tên hay ID? (name/ID): ").toLowerCase().trim();

    if (search_type === "name") {
        let name = prompt("Nhập tên cần tìm: ").toLowerCase().trim();
        let results = student_list.filter(student => student.name.toLowerCase().includes(name));

        if (results.length === 0) {
            alert("Không tìm thấy sinh viên với tên này!");
            return;
        }

        results.forEach(student => {
            console.log(`${student.ID} - ${student.name} - ${student.math} - ${student.literature} - ${student.english} - ${student.avg.toFixed(2)}`);
        });
    } else if (search_type === "id") {
        let ID = prompt("Nhập ID cần tìm: ");
        let result = student_list.find(student => student.ID === ID);

        if (!result) {
            alert("Không tìm thấy sinh viên với ID này!");
            return;
        }

        console.log(`${result.ID} - ${result.name} - ${result.math} - ${result.literature} - ${result.english} - ${result.avg.toFixed(2)}`);
    } else {
        alert("Lựa chọn không hợp lệ!");
    }
}

const filter_student = () => {
    let filter_choice = prompt("Lọc theo học lực nào? (Giỏi/Khá/Trung bình): ").toLowerCase().trim();

    let results = [];
    if (filter_choice === "giỏi") {
        results = student_list.filter(student => student.avg >= 8);
    } else if (filter_choice === "khá") {
        results = student_list.filter(student => student.avg >= 6.5 && student.avg < 8);
    } else if (filter_choice === "trung bình") {
        results = student_list.filter(student => student.avg < 6.5);
    } else {
        alert("Học lực không hợp lệ!");
        return;
    }

    if (results.length === 0) {
        alert(`Không có sinh viên nào thuộc loại: ${filter_choice}`);
        return;
    }

    results.forEach(student => {
        console.log(`${student.ID} - ${student.name} - ${student.math} - ${student.literature} - ${student.english} - ${student.avg.toFixed(2)}`);
    });
}

const avg_class = () => {
    let total = student_list.reduce((sum, student) => sum + student.avg, 0);
    let avg = total / student_list.length;
    alert(`Điểm trung bình của cả lớp là: ${avg.toFixed(2)}`);
}

const sort_avg = () => {
    let choice = prompt("Sắp xếp: tăng hay giảm? (tăng/giảm): ").toLowerCase().trim();

    if (choice === "tăng") {
        student_list.sort((a, b) => a.avg - b.avg);
    } else if (choice === "giảm") {
        student_list.sort((a, b) => b.avg - a.avg);
    } else {
        alert("Lựa chọn không hợp lệ!");
        return;
    }

    student_list.forEach(student => {
        console.log(`${student.ID} - ${student.name} - ${student.math} - ${student.literature} - ${student.english} - ${student.avg.toFixed(2)}`);
    });
}

function main() {
    let choice;
    do {
        choice = Number(prompt(`
1. Hiển thị danh sách sinh viên
2. Thêm sinh viên
3. Xóa sinh viên
4. Cập nhật thông tin sinh viên
5. Tìm sinh viên
6. Phân loại sinh viên
7. Tính điểm trung bình cả lớp
8. Sắp xếp sinh viên theo điểm
9. Tìm sinh viên theo khoảng điểm
0. Thoát
Chọn: `));

        switch (choice) {
            case 1:
                show_list();
                break;
            case 2:
                add_student();
                break;
            case 3:
                delete_student();
                break;
            case 4:
                update_student();
                break;
            case 5:
                find_student();
                break;
            case 6:
                filter_student();
                break;
            case 7:
                avg_class();
                break;
            case 8:
                sort_avg();
                break;
            case 9:
                alert("Case thi công chưa xong...");
                break;
            case 0:
                alert("Tạm biệt!");
                break;
            default:
                alert("Lựa chọn không hợp lệ!");
        }
    } while (choice !== 0);
}

main();