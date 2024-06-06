// Đảm bảo mảng prizeNames có thứ tự khớp với các tùy chọn trong dropdown
const prizeNames = ['Giải 9', 'Giải 8', 'Giải 7', 'Giải 6', 'Giải 5', 'Giải 4', 'Giải 3', 'Giải 2', 'Giải 1'];
let remainingEntries = [];
let selectedPrizeName = '';

function startSpinProcess() {
    const prizeSelect = document.getElementById('prizeSelect');
    selectedPrizeName = prizeNames[prizeSelect.selectedIndex]; // Cập nhật giá trị của selectedPrizeName khi nút được nhấn

    if (remainingEntries.length === 0) {
        fetch('data.csv')
            .then(response => response.text())
            .then(data => {
                const rows = data.trim().split('\n');
                remainingEntries = rows.map(row => {
                    const [number, name] = row.split(',');
                    return { number: number.trim(), name: name.trim() };
                });
                remainingEntries.sort(() => Math.random() - 0.5); // Đảo ngẫu nhiên để tạo hiệu ứng quay số

                // Bắt đầu quay
                startSpin();
            });
    } else {
        startSpin();
    }
}

document.getElementById('spinButton').addEventListener('click', startSpinProcess);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        startSpinProcess();
    }
});

function startSpin() {
    if (remainingEntries.length === 0) {
        alert('Không còn người tham gia để quay số.');
        return;
    }

    const resultDiv = document.getElementById('result');
    const digitIntervalTime = 10; // Thời gian giữa mỗi lần hiển thị chữ số ngẫu nhiên
    const randomSpinDuration = 2000; // Tổng thời gian quay số ngẫu nhiên trước khi hiển thị từng chữ số
    const displayDuration = 1000; // Tổng thời gian hiển thị từng chữ số chính xác

    // Lấy người chiến thắng đầu tiên từ danh sách
    const winningEntry = remainingEntries.shift();
    const winningNumber = winningEntry.number;
    const winningName = winningEntry.name;
    const digits = winningNumber.split('');
    let digitIndex = 0;

    // Quay số ngẫu nhiên trước khi hiển thị từng chữ số chính xác
    const randomSpinStartTime = Date.now();
    const randomSpinInterval = setInterval(() => {
        if (Date.now() - randomSpinStartTime < randomSpinDuration) {
            // Hiển thị số ngẫu nhiên
            let randomNumber = '';
            for (let i = 0; i < digits.length; i++) {
                randomNumber += Math.floor(Math.random() * 10);
            }
            resultDiv.textContent = randomNumber;
        } else {
            clearInterval(randomSpinInterval);
            // Bắt đầu hiển thị từng chữ số chính xác
            spinDigit(0);
        }
    }, digitIntervalTime);

    function spinDigit(digitIndex) {
        let spinStartTime = Date.now();
        const interval = setInterval(() => {
            if (Date.now() - spinStartTime < displayDuration) {
                // Hiển thị chữ số ngẫu nhiên
                let randomDigit = Math.floor(Math.random() * 10);
                if (digitIndex === 0) {
                    resultDiv.textContent = randomDigit;
                } else {
                    resultDiv.textContent = resultDiv.textContent.slice(0, digitIndex) + randomDigit + resultDiv.textContent.slice(digitIndex + 1);
                }
            } else {
                clearInterval(interval);
                // Hiển thị chữ số chính xác
                if (digitIndex === 0) {
                    resultDiv.textContent = digits[digitIndex];
                } else {
                    resultDiv.textContent = resultDiv.textContent.slice(0, digitIndex) + digits[digitIndex] + resultDiv.textContent.slice(digitIndex + 1);
                }

                // Nếu còn chữ số tiếp theo, tiếp tục quay
                if (digitIndex < digits.length - 1) {
                    spinDigit(digitIndex + 1);
                } else {
                    // Hiển thị tên của người trúng giải
                    setTimeout(() => {
                        resultDiv.innerHTML += `<br>${winningName} - ${selectedPrizeName}`;
                    }, 1000); // Thời gian chờ trước khi hiển thị tên
                }
            }
        }, digitIntervalTime);
    }
}
