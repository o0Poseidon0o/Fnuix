const prizesOrder = ['thirdPrize', 'secondPrize', 'firstPrize', 'specialPrize'];
const prizeNames = ['Giải Ba', 'Giải Nhì', 'Giải Nhất', 'Giải Đặc Biệt'];
let currentPrizeIndex = 0;
let remainingEntries = [];

document.getElementById('startButton').addEventListener('click', function() {
    if (currentPrizeIndex < prizesOrder.length) {
        document.getElementById('prizeName').textContent = prizeNames[currentPrizeIndex];
        document.getElementById('spinButton').style.display = 'block';
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('result').textContent = ''; // Reset kết quả
    }
});

document.getElementById('spinButton').addEventListener('click', function() {
    if (remainingEntries.length === 0) {
        fetch('data.csv')
            .then(response => response.text())
            .then(data => {
                const rows = data.trim().split('\n');
                remainingEntries = rows.map(row => {
                    const [number, name] = row.split(',');
                    return { number: number.trim(), name: name.trim() };
                });
                startSpin();
            });
    } else {
        startSpin();
    }
});

function startSpin() {
    const resultDiv = document.getElementById('result');
    let index = 0;
    const fastDuration = 4000; // 4 giây đầu quay nhanh
    const slowDuration = 3000;  // 3 giây cuối quay chậm
    const totalEntries = remainingEntries.length;
    const fastIntervalTime = 50; // Quay nhanh với mỗi số xuất hiện sau 50ms
    const slowIntervalTime = slowDuration / totalEntries; // Thời gian giữa mỗi lần hiển thị số trong 3 giây cuối

    let startTime = Date.now();

    const interval = setInterval(() => {
        if (Date.now() - startTime < fastDuration) {
            // Quay nhanh
            resultDiv.textContent = remainingEntries[Math.floor(Math.random() * remainingEntries.length)].number;
        } else {
            // Dừng quay nhanh, bắt đầu quay chậm
            clearInterval(interval);
            const slowInterval = setInterval(() => {
                if (index < remainingEntries.length) {
                    resultDiv.textContent = remainingEntries[index].number;
                    index++;
                } else {
                    clearInterval(slowInterval);

                    // Chọn người trúng giải thưởng hiện tại
                    const randomIndex = Math.floor(Math.random() * remainingEntries.length);
                    const winner = remainingEntries[randomIndex];

                    // Hiển thị số và tên của người trúng giải trên màn hình
                    resultDiv.textContent = `${winner.number} - ${winner.name}`;

                    // Xóa người trúng khỏi mảng remainingEntries
                    remainingEntries.splice(randomIndex, 1);

                    // Cập nhật chỉ số giải thưởng hiện tại
                    currentPrizeIndex++;
                    if (currentPrizeIndex >= prizesOrder.length) {
                        currentPrizeIndex = 0; // Reset sau khi hoàn thành tất cả các giải thưởng
                    }

                    // Hiển thị nút cho giải thưởng tiếp theo
                    document.getElementById('spinButton').style.display = 'none';
                    document.getElementById('startButton').style.display = 'block';
                }
            }, slowIntervalTime);
        }
    }, fastIntervalTime);
}