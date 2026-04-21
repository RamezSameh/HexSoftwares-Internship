class UnityFund {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('uf_projects')) || this.getSeedData();
        this.currentProject = null;
        this.init();
    }

    init() {
        this.renderProjects();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Modal Toggles
        document.getElementById('openCreateModal').onclick = () => this.toggleModal('createModal', true);
        document.getElementById('closeCreate').onclick = () => this.toggleModal('createModal', false);
        document.getElementById('closeDetail').onclick = () => this.toggleModal('detailModal', false);

        // Form Submission
        document.getElementById('projectForm').onsubmit = (e) => {
            e.preventDefault();
            this.createProject();
        };

        // Contribution
        document.getElementById('confirmPayment').onclick = () => this.processPayment();

        // Updates
        document.getElementById('postUpdate').onclick = () => this.addUpdate();

        // Global Close on Click Outside
        window.onclick = (e) => {
            if (e.target.classList.contains('modal')) {
                this.toggleModal(e.target.id, false);
            }
        };
    }

    getSeedData() {
        return [
            {
                id: 1,
                title: "Ocean Cleanup Drone",
                description: "Autonomous drones designed to collect microplastics from coastlines.",
                goal: 50000,
                raised: 12500,
                updates: [{ date: "2024-04-10", text: "Prototype Alpha completed testing!" }]
            }
        ];
    }

    renderProjects() {
        const grid = document.getElementById('projectGrid');
        grid.innerHTML = this.projects.map(p => {
            const percent = Math.min((p.raised / p.goal) * 100, 100).toFixed(0);
            return `
                <div class="project-card" onclick="app.viewDetails(${p.id})">
                    <div class="card-content">
                        <h3>${this.escape(p.title)}</h3>
                        <p>${this.escape(p.description).substring(0, 100)}...</p>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${percent}%"></div>
                        </div>
                        <div class="stats-row">
                            <span>$${p.raised.toLocaleString()} raised</span>
                            <span>${percent}%</span>
                        </div>
                        <div class="stats-row" style="color: var(--secondary); margin-top:5px;">
                            <span>Goal: $${p.goal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    createProject() {
        const newProject = {
            id: Date.now(),
            title: document.getElementById('projTitle').value,
            description: document.getElementById('projDesc').value,
            goal: parseFloat(document.getElementById('projGoal').value),
            raised: 0,
            updates: []
        };

        this.projects.unshift(newProject);
        this.save();
        this.renderProjects();
        this.toggleModal('createModal', false);
        this.showNotification("Project launched successfully!", "success");
        document.getElementById('projectForm').reset();
    }

    viewDetails(id) {
        this.currentProject = this.projects.find(p => p.id === id);
        const p = this.currentProject;
        const percent = Math.min((p.raised / p.goal) * 100, 100).toFixed(0);

        document.getElementById('detailView').innerHTML = `
            <h2>${this.escape(p.title)}</h2>
            <p style="margin: 1rem 0; color: #475569;">${this.escape(p.description)}</p>
            <div class="progress-container" style="height: 15px;">
                <div class="progress-bar" style="width: ${percent}%"></div>
            </div>
            <div class="stats-row" style="font-size: 1.1rem; margin-bottom: 2rem;">
                <span>$${p.raised.toLocaleString()} / $${p.goal.toLocaleString()}</span>
                <span>${percent}% Funded</span>
            </div>
        `;

        this.renderUpdates();
        this.toggleModal('detailModal', true);
    }

    async processPayment() {
        const amount = parseFloat(document.getElementById('contributeAmount').value);
        if (!amount || amount <= 0) return alert("Please enter a valid amount");

        const overlay = document.getElementById('paymentOverlay');
        overlay.style.display = 'flex';

        // Simulate API call to Payment Processor (e.g., Stripe/PayPal)
        await new Promise(resolve => setTimeout(resolve, 2000));

        this.currentProject.raised += amount;
        this.save();
        
        overlay.style.display = 'none';
        document.getElementById('contributeAmount').value = '';
        this.viewDetails(this.currentProject.id); // Refresh view
        this.renderProjects();
        this.showNotification(`Successfully contributed $${amount}!`, "success");
    }

    addUpdate() {
        const text = document.getElementById('updateText').value;
        if (!text) return;

        this.currentProject.updates.unshift({
            date: new Date().toLocaleDateString(),
            text: text
        });

        this.save();
        this.renderUpdates();
        document.getElementById('updateText').value = '';
        this.showNotification("Update posted!");
    }

    renderUpdates() {
        const list = document.getElementById('updateList');
        list.innerHTML = this.currentProject.updates.length 
            ? this.currentProject.updates.map(u => `
                <div class="update-item">
                    <div class="update-date">${u.date}</div>
                    <div>${this.escape(u.text)}</div>
                </div>
            `).join('')
            : '<p style="color: var(--secondary)">No updates yet.</p>';
    }

    toggleModal(id, show) {
        document.getElementById(id).style.display = show ? 'block' : 'none';
        if (!show) this.currentProject = null;
    }

    save() {
        localStorage.setItem('uf_projects', JSON.stringify(this.projects));
    }

    showNotification(msg, type = "") {
        const n = document.getElementById('notification');
        n.textContent = msg;
        n.className = `notification show ${type}`;
        setTimeout(() => n.classList.remove('show'), 3000);
    }

    escape(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }
}
const app = new UnityFund();