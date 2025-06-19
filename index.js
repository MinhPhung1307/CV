// Initialize AOS
AOS.init({ 
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.navbar-links').classList.toggle('active');
});

// hàm xử lý khi bấm nút tải CV
function downloadPDF() {
    const element = document.getElementById("cv-content");
    const header = element.querySelector("header");
    const headerH1 = element.querySelector("header h1");
    const footer = element.querySelector("footer");
    const downloadBtn = document.querySelector(".download-btn");
    const originalScroll = window.scrollY;

    // Lưu lại màu cũ
    const oldHeaderBg = header.style.background;
    const oldHeaderh1Bg = headerH1.style.background;
    const oldFooterBg = footer?.style.background;

    // Ẩn hiệu ứng
    element.querySelectorAll("[data-aos]").forEach(e => e.removeAttribute("data-aos"));

    // thay đổi màu
    header.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    headerH1.style.background = "none";
    if (footer) footer.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    if (footer) footer.style.color = "#fff";

    // Lấy kích thước thực tế của bố cục
    const width = element.scrollWidth;
    const height = element.scrollHeight;

    html2pdf()
        .set({
        margin: 0,
        filename: 'NguyenMinhPhung_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            scrollY: 0,
            windowWidth: width,
            windowHeight: height
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
        })
        .from(element)
        .save()
        .then(() => {
        // Khôi phục màu gốc
        header.style.background = oldHeaderBg;
        headerH1.style.background = oldHeaderh1Bg;
        if (footer) footer.style.background = oldFooterBg;
        if (downloadBtn) downloadBtn.style.display = "block";
        window.scrollTo(0, originalScroll);
    });
}

