document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            serviceCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('dropdown-toggle')) return;
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const searchBtn = document.getElementById('searchBtn');
    const searchBox = document.getElementById('searchBox');
    
    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                document.getElementById('searchInput').focus();
            }
        });

        searchBox.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
const dropdownLinks = document.querySelectorAll(".dropdown-menu a");

dropdownLinks.forEach(link => {
    link.addEventListener("click", function() {
        const parentDropdown = this.closest('.dropdown');
        if (parentDropdown) {
            parentDropdown.classList.remove('active');
        }
    });
});
   const dropdownMenus = document.querySelectorAll(".dropdown > .nav-link");
    dropdownMenus.forEach(menu => {
        menu.addEventListener("click", function(e) {
            e.stopPropagation();
            const parentDropdown = this.parentElement;
            document.querySelectorAll(".dropdown").forEach(item => {
                if (item !== parentDropdown) {
                    item.classList.remove("active");
                }
            });

            parentDropdown.classList.toggle("active");
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll(".dropdown").forEach(item => {
                item.classList.remove("active");
            });
        }
        if (searchBox && !e.target.closest('.search-wrapper')) {
            searchBox.classList.remove('active');
        }
    });

    const input = document.getElementById("searchInput");
    if (input) {
        input.addEventListener("keyup", function(e) {
            if (e.key === "Enter") {
                const keyword = this.value.toLowerCase().trim();
                if (!keyword) return;

                const elements = document.querySelectorAll("h1, h2, h3, h4, p, span, li");
                let found = false;

                elements.forEach(el => {
                    if (el.textContent.toLowerCase().includes(keyword) && !found) {
                        el.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                        el.style.transition = ".3s";
                        el.style.background = "#4ade80";
                        el.style.color = "#000";

                        setTimeout(() => {
                            el.style.background = "";
                            el.style.color = "";
                        }, 1800);

                        found = true;
                    }
                });

                if (!found) {
                    alert("Data tidak ditemukan.");
                }
            }
        });
    }

    console.log("Perhutani KPH Pemalang Website Loaded Successfully.");
});
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        serviceCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

async function updateWeatherPemalang() {
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("weatherDescription");
    const icon = document.getElementById("weatherIcon");

    if (!temperature || !description || !icon) return;
    const latitude = -6.8947;
    const longitude = 109.3797;

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day` +
        `&timezone=Asia%2FJakarta`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Gagal mengambil data cuaca");
        }

        const data = await response.json();
        const weather = data.current;

        temperature.textContent =
            `${Math.round(weather.temperature_2m)}°C`;

        description.textContent =
            getWeatherDescription(weather.weather_code);

        icon.className = getWeatherIcon(
            weather.weather_code,
            weather.is_day
        );

        console.log("Cuaca Pemalang diperbarui:", weather);

    } catch (error) {
        console.error("Cuaca gagal dimuat:", error);

        temperature.textContent = "--°C";
        description.textContent = "Cuaca tidak tersedia";
        icon.className = "fa-solid fa-cloud";
    }
}

function getWeatherDescription(code) {

    if (code === 0) {
        return "Cerah";
    }

    if (code === 1 || code === 2) {
        return "Cerah Berawan";
    }

    if (code === 3) {
        return "Berawan";
    }

    if ([45, 48].includes(code)) {
        return "Berkabut";
    }

    if ([51, 53, 55].includes(code)) {
        return "Gerimis";
    }

    if ([56, 57].includes(code)) {
        return "Gerimis Beku";
    }

    if ([61, 63, 65].includes(code)) {
        return "Hujan";
    }

    if ([66, 67].includes(code)) {
        return "Hujan Beku";
    }

    if ([71, 73, 75, 77].includes(code)) {
        return "Salju";
    }

    if ([80, 81, 82].includes(code)) {
        return "Hujan Deras";
    }

    if ([85, 86].includes(code)) {
        return "Salju Deras";
    }

    if ([95].includes(code)) {
        return "Badai Petir";
    }

    if ([96, 99].includes(code)) {
        return "Badai Petir & Hujan Es";
    }

    return "Kondisi Berubah";
}

function getWeatherIcon(code, isDay) {

    if (code === 0) {
        return isDay
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
    }

    if (code === 1 || code === 2) {
        return isDay
            ? "fa-solid fa-cloud-sun"
            : "fa-solid fa-cloud-moon";
    }

    if (code === 3) {
        return "fa-solid fa-cloud";
    }

    if ([45, 48].includes(code)) {
        return "fa-solid fa-smog";
    }

    if ([51, 53, 55, 56, 57].includes(code)) {
        return "fa-solid fa-cloud-rain";
    }

    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return "fa-solid fa-cloud-showers-heavy";
    }

    if ([95, 96, 99].includes(code)) {
        return "fa-solid fa-cloud-bolt";
    }

    return "fa-solid fa-cloud";
}

updateWeatherPemalang();

setInterval(updateWeatherPemalang, 10 * 60 * 1000);

const langToggle = document.querySelector(".lang-toggle");
const langButtons = document.querySelectorAll(".lang-option");

langButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedLanguage = button.dataset.lang;

        langButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        if (selectedLanguage === "en") {
            langToggle.classList.add("en");
        } else {
            langToggle.classList.remove("en");
        }

        langToggle.classList.add("clicked");

        setTimeout(() => {
            langToggle.classList.remove("clicked");
        }, 300);

        localStorage.setItem("selectedLanguage", selectedLanguage);

        console.log("Bahasa dipilih:", selectedLanguage);
    });

});

const savedLanguage = localStorage.getItem("selectedLanguage");

if (savedLanguage === "en") {

    const enButton = document.querySelector(
        '.lang-option[data-lang="en"]'
    );

    if (enButton) {
        enButton.click();
    }

} else {

    const idButton = document.querySelector(
        '.lang-option[data-lang="id"]'
    );

    if (idButton) {
        idButton.classList.add("active");
    }

}
document.addEventListener("DOMContentLoaded", function() {
    // Memilih semua gambar di dalam kartu program dan kartu BUMN
    const images = document.querySelectorAll("main img, .bumn-photo-card img");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImageDisplay");

    images.forEach(img => {
        img.classList.add("program-img"); // Menambahkan kelas agar kursor berubah jadi pointer
        img.addEventListener("click", function(e) {
            e.stopPropagation(); // Mencegah event bubbling
            modal.style.display = "flex";
            modalImg.src = this.src; // Mengambil sumber gambar yang diklik
        });
    });
});

// Fungsi untuk menutup modal saat area gelap atau tombol close diklik
function closeFullImage() {
    document.getElementById("imageModal").style.display = "none";
}
const appLauncherBtn = document.getElementById("appLauncherBtn");
    const appLauncherDropdown = document.querySelector(".app-launcher-dropdown");
    // Logika untuk Fitur Layanan Pengaduan
    const complaintModal = document.getElementById("complaintModal");
    const openComplaintBtn = document.getElementById("openComplaintBtn"); // Tombol pemicu di menu/header
    const closeComplaint = document.getElementById("closeComplaint");
    const complaintForm = document.getElementById("complaintForm");

    // Buka Modal Pengaduan
    if (openComplaintBtn && complaintModal) {
        openComplaintBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            complaintModal.style.display = "flex";
        });
    }

    // Tutup Modal Pengaduan
    if (closeComplaint && complaintModal) {
        closeComplaint.addEventListener("click", function () {
            complaintModal.style.display = "none";
        });
    }

    // Tutup saat klik di luar area modal
    window.addEventListener("click", function (e) {
        if (e.target === complaintModal) {
            complaintModal.style.display = "none";
        }
    });

    // Kirim Data Pengaduan langsung ke WhatsApp Admin KPH Pemalang
    if (complaintForm) {
        complaintForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("cName").value.trim();
            const phone = document.getElementById("cPhone").value.trim();
            const category = document.getElementById("cCategory").value;
            const message = document.getElementById("cMessage").value.trim();

            // Nomor WhatsApp Resmi Admin (Ganti dengan nomor tujuan Anda, contoh: 628xxxxxxxxxx)
            const adminWhatsApp = "6281234567890"; 

            // Format teks pesan WhatsApp
            const text = `*LAYANAN PENGADUAN & ASPIRASI - KPH PEMALANG*%0A%0A` +
                         `*Nama:* ${name}%0A` +
                         `*No. HP:* ${phone}%0A` +
                         `*Kategori:* ${category}%0A` +
                         `*Pesan/Laporan:*%0A${message}`;

            // Buka link WhatsApp otomatis
            const waUrl = `https://wa.me/${adminWhatsApp}?text=${text}`;
            window.open(waUrl, "_blank");

            // Reset form dan tutup modal setelah dikirim
            complaintForm.reset();
            complaintModal.style.display = "none";
        });
    }
    document.addEventListener("DOMContentLoaded", function () {
    const openQuizBtn = document.getElementById("openQuizBtn");
    const quizModal = document.getElementById("quizModal");
    const closeQuizBtn = document.getElementById("closeQuizBtn");
    const quizQuestion = document.getElementById("quizQuestion");
    const quizOptions = document.getElementById("quizOptions");
    const quizFooter = document.getElementById("quizFooter");

    // Data Pertanyaan Kuis Seputar Hutan / Lingkungan
    const quizData = [
        {
            question: "Apa fungsi utama dari kawasan hutan selain menghasilkan oksigen?",
            options: [
                "Tempat pembuangan akhir sampah",
                "Penyerap karbon dan penyangga tata air (mencegah erosi)",
                "Sumber bahan bangunan ilegal",
                "Lokasi balap liar"
            ],
            correct: 1
        },
        {
            question: "Organisasi atau sistem apa yang bermitra langsung dengan Perhutani dalam mengelola kawasan hutan bersama masyarakat?",
            options: [
                "LMDH (Lembaga Masyarakat Desa Hutan)",
                "Klub Sepak Bola Lokal",
                "Komunitas Pemancing Ikan",
                "Asosiasi Pedagang Pasar"
            ],
            correct: 0
        },
        {
            question: "Mengapa kegiatan penanaman pohon kembali (reboisasi) sangat penting bagi bumi?",
            options: [
                "Agar suhu bumi semakin panas",
                "Mengurangi keindahan alam",
                "Memulihkan fungsi ekosistem dan mencegah bencana longsor",
                "Menambah polusi udara"
            ],
            correct: 2
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    // Buka Modal Kuis
    if (openQuizBtn && quizModal) {
        openQuizBtn.addEventListener("click", function () {
            quizModal.style.display = "flex";
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion();
        });
    }

    // Tutup Modal Kuis
    if (closeQuizBtn && quizModal) {
        closeQuizBtn.addEventListener("click", function () {
            quizModal.style.display = "none";
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target === quizModal) {
            quizModal.style.display = "none";
        }
    });

    // Muat Pertanyaan ke Tampilan
    function loadQuestion() {
        if (currentQuestionIndex < quizData.length) {
            const currentQ = quizData[currentQuestionIndex];
            quizQuestion.textContent = currentQ.question;
            quizOptions.innerHTML = "";

            currentQ.options.forEach((option, index) => {
                const btn = document.createElement("button");
                btn.textContent = option;
                btn.style.cssText = "width: 100%; text-align: left; padding: 10px 14px; background: #1f2937; border: 1px solid #374151; color: #f3f4f6; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;";
                
                btn.onmouseover = () => { btn.style.background = "#374151"; btn.style.borderColor = "#4ade80"; };
                btn.onmouseout = () => { btn.style.background = "#1f2937"; btn.style.borderColor = "#374151"; };

                btn.onclick = () => checkAnswer(index, currentQ.correct);
                quizOptions.appendChild(btn);
            });

            quizFooter.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizData.length}`;
        } else {
            showResult();
        }
    }

    // Periksa Jawaban Pengguna
    function checkAnswer(selected, correct) {
        if (selected === correct) {
            score++;
        }
        currentQuestionIndex++;
        loadQuestion();
    }

    function showResult() {
        quizQuestion.textContent = "🎉 Kuis Selesai!";
        quizOptions.innerHTML = `
            <div style="text-align: center; padding: 15px 0;">
                <p style="font-size: 1.1rem; margin-bottom: 10px; color: #4ade80;">Skor Anda: ${score} dari ${quizData.length}</p>
                <p style="font-size: 0.85rem; color: #9ca3af; margin-bottom: 20px;">Terima kasih sudah ikut menjaga kesadaran lingkungan bersama KPH Pemalang!</p>
                <button id="restartQuiz" style="background: #15803d; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">Ulangi Kuis</button>
            </div>
        `;
        quizFooter.textContent = "Selesai";

        document.getElementById("restartQuiz").onclick = function () {
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion();
        };
    }
});


});
