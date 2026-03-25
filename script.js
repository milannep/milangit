// Update Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars-staggered"></i>';
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    });
});

// Sticky Header Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==========================================
// AJAX Formspree Submission Logic
// ==========================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = contactForm.querySelector('.submit-btn');
const originalBtnText = submitBtn.innerHTML;

contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    formStatus.className = 'form-status'; 
    formStatus.style.display = 'none';

    const data = new FormData(event.target);

    try {
        const response = await fetch(event.target.action, {
            method: contactForm.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Success! Your message has been sent.';
            formStatus.classList.add('success');
            formStatus.style.display = 'block';
            contactForm.reset();
        } else {
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                formStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> ' + responseData.errors.map(error => error.message).join(", ");
            } else {
                formStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Oops! There was a problem submitting your form.';
            }
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
        }
    } catch (error) {
        formStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Oops! Check your internet connection and try again.';
        formStatus.classList.add('error');
        formStatus.style.display = 'block';
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
    }
});

// ==========================================
// Prompt Vault Logic (Data, Render, Modal, Copy)
// ==========================================

// OPTIMIZATION: Switched all C:\ drive paths to relative "assets/..." paths
const promptsData = [
    {
        id: 1,
        badgeClass: "badge-image",
        badgeText: "IMAGE PROMPT",
        title: "Abandoned AI Image (Trend)",
        desc: "Create an abandoned scene from a reference image, then animate it with a realistic handheld flashlight POV.",
        mediaType: "image", 
        mediaPath: "assets/promptimage.png",
        thumbnailPath: "assets/promptimage.png", // Same as image
        promptText: "=== IMAGE PROMPT ===\nUse the uploaded image strictly as a reference. Maintain the original proportions, materials, colors, textures, and facial details—no redesign or stylization.\n\nThe scene is shown from a first-person POV inside an abandoned deep jungle (real trees, plants, or natural location). The viewer holds a flashlight, which acts as the primary light source, creating a single circular beam while the rest of the environment remains in darkness.\n\nThe camera framing must be a close shot only—no wide angles or distant perspectives. Keep the camera very close to the subject, focusing on the upper body, face, and nearby textures with an intimate composition.\n\nWithin the flashlight beam, a human character stands completely still, like a statue—emotionless, rigid, and lifeless. No movement, performance, or action—only a silent presence.\n\nThe character appears old, dirty, and abandoned, with worn clothing, dust, stains, discoloration, and visible damage.\n\nThe environment should clearly reflect abandonment, including dusty surfaces, old filming equipment, scattered cables, and faded set elements. Dust particles must be visible in the flashlight beam.\n\nStyle should be photorealistic with harsh flashlight shadows, rough textures, and a documentary, on-location feel.\n\nAspect Ratio: 9:16\n\n\n=== VIDEO CREATION WORKFLOW ===\nTool: Nano Banana 2\nWorkflow: Google Flow → Open dashboard → Select “Frame-to-Frame Video”\n\n\n=== VIDEO PROMPT ===\nThe camera represents a real human POV, slowly walking through an abandoned indoor environment. The shot must be continuous, uncut, and handheld, with natural human imperfections.\n\nCamera movement should feel realistic, including subtle vertical bobbing from footsteps, gentle side-to-side sway, and minor handheld shake. Walking pace is slow and cautious, with uneven rhythm, hesitation, and occasional pauses.\n\nThe viewer holds a flashlight, which serves as the main light source. The beam forms a circular cone with realistic falloff and intensity drop. Its movement should react naturally to walking and turning, including slight delays, overcorrections, and imperfect control. Dust particles should be visible within the beam, along with strong shadows and contrast.\n\nInside the light beam, a character is present but completely motionless—no breathing, blinking, or movement. The posture remains fixed throughout.\n\nEnvironmental motion should be minimal and realistic, limited to floating dust, faint flickers, or slight movement of loose materials like fabric or debris.\n\nThe scene must remain fully consistent—no object changes, transitions, or unnatural shifts.\n\nVisual style should emphasize photorealistic found-footage realism, including natural low-light exposure, deep shadows, gritty textures, mild sensor noise, subtle motion blur, and slight focus breathing. Lighting should remain natural with strong contrast and imperfect illumination.\n\nThe final output should feel raw and authentic, like real handheld documentation footage."
    },
    {
        id: 2,
        badgeClass: "badge-image",
        badgeText: "IMAGE PROMPT",
        title: "Enhance Your Old Image",
        desc: "High-end portrait enhancement prompt with preserved identity, cinematic realism, and strict negative constraints.",
        mediaType: "image", 
        mediaPath: "assets/new image.png",
        thumbnailPath: "assets/new image.png", // Same as image
        promptText: "=== TOOL ===\nNano Banana 2\n\n=== IMAGE PROMPT ===\nEnhance the portrait while strictly preserving the subject’s identity and accurate facial structure. Do not alter expression or face shape—only apply subtle refinements.\n\nKeep the exact same background from the reference image. No changes, replacements, or additions are allowed.\n\nRecreate the image as if shot on a Sony A1 with an 85mm f1.4 lens at f1.6, ISO 100, and 1/200 shutter speed. Ensure cinematic shallow depth of field, precise facial focus, and an editorial-neutral color profile. This camera setup is mandatory and must reflect premium full-frame quality.\n\nLighting must match the original direction and mood but be enhanced into a cinematic style: soft directional light, warm highlights, cool shadows, deeper contrast, expanded dynamic range, and improved micro-contrast. Avoid harsh lighting.\n\nMaintain natural skin texture, realistic tones, subtle film grain, and balanced color grading. Avoid oversmoothing, artificial glow, or exaggerated effects.\n\nRender in 4K resolution with 10-bit color, maintaining a cinematic editorial style and the original environment’s authenticity.\n\nRe-render the subject with improved realism, depth, and lighting while fully preserving identity and background.\n\n=== NEGATIVE INSTRUCTIONS ===\nNo background changes\nNo new elements\nNo dramatic lighting shifts\nNo facial distortion\nNo artificial glow\nNo flat lighting\nNo overly smooth skin"
    },
    {
        id: 3,
        badgeClass: "badge-image",
        badgeText: "IMAGE PROMPT",
        title: "DHURANDHAR 2",
        desc: "Ultra-realistic cinematic Bollywood revenge-thriller poster with strict identity preservation and dramatic red lighting.",
        mediaType: "image",
        mediaPath: "assets/dhuran.png",
        thumbnailPath: "assets/dhuran.png",
        promptText: "=== TOOL ===\n\nNano Banana 2\n\n=== IMAGE PROMPT ===\n\nPreserve exact facial identity with absolute accuracy: face shape, eyes, nose, lips, jawline, beard, hair, skin tone, expression. ZERO face morphing. ZERO beautification. The person must clearly look like the same individual.\n\nCreate an ultra-realistic cinematic Bollywood revenge-thriller poster.\n\nSUBJECT:\n\nA fierce Indian man standing front-facing at the center, intense cold-blooded expression, short-to-medium hair soaked in rain, thick beard dripping with water, strong dominant posture. Wearing dark rugged clothing fully soaked.\n\nENVIRONMENT & EFFECTS:\n\nExtremely heavy rain pouring straight down. Rain is deep blood-red in color. High-density rainfall covering the entire frame. Individual rain droplets frozen in motion. Realistic water splashes on face, beard, neck, and clothing.\n\nLIGHTING (KEY FOCUS):\n\nStrong dramatic RED cinematic lighting. Hard top-down red light hitting the face and forehead. Red rim light around hair and shoulders. Deep black shadows under eyes and beard. High contrast, no soft light, no beauty lighting. Wet skin reflections clearly visible.\n\nBACKGROUND:\n\nDark crimson red textured wall. Engraved cinematic depth. Subtle vignette on edges.\n\nTEXT (STRICT – ONLY THESE TWO):\n\n1) “THE REVENGE”\n\n– Large bold engraved cinematic serif text\n– Faded, low opacity\n– Slight blur\n– Embedded into the red background wall\n\n2) “DHURANDHAR 2”\n\n– Heavy cinematic engraved serif font\n– Thick bold letters with sharp classic edges\n– Metallic silver texture with dark red undertones\n– Strong bevel and emboss\n– Deep inner shadows\n– Epic Bollywood movie title look\n– Placed at the bottom\n\nABSOLUTELY NO:\n\nNo extra text\nNo credits\nNo logos\nNo watermarks\n\nCAMERA & QUALITY:\n\nProfessional DSLR look. 85mm cinematic portrait lens. Shallow depth of field. Ultra-sharp focus. 4K RAW quality. Natural film grain. High dynamic range. Professional movie-poster color grading."
    },
    {
        id: 4,
        badgeClass: "badge-image",
        badgeText: "IMAGE PROMPT",
        title: "DHURANDHAR 2",
        desc: "Ultra-realistic 8K photorealistic cinematic action film still, vertical 9:16, featuring dramatic fire-lit industrial alley and rugged hero.",
        mediaType: "image",
        mediaPath: "assets/dhu2.png",
        thumbnailPath: "assets/dhu2.png",
        promptText: `=== TOOL ===\n\nNano Banana 2\n\n=== IMAGE PROMPT ===\n\nUltra-realistic 8K photorealistic cinematic action film still, vertical 9:16.\n\nDark industrial alley at night with dramatic fire lighting.\n\nA rugged muscular man stands in a dim industrial alley holding a heavy chain weapon with a flaming spiked metal head (mace/flail).\nThe weapon is raised beside and slightly forward of him. The burning metal head glows with bright orange flames, sparks, and thick smoke. A chain hangs downward connecting to a metal handle gripped firmly in his hand.\n\nCAMERA & FRAMING:\n\nCinematic medium close-up. Camera slightly below eye level, angled upward for power. Framing from upper chest to head, flaming weapon occupying the upper-left frame. Subject positioned slightly right of center with shallow depth of field.\n\nPOSE & EXPRESSION:\n\nBody angled slightly left, facing camera. Head slightly tilted downward, eyes forward with an intense focused expression. One arm raised holding the weapon beside the head.\n\nHAIR & BEARD:\n\nLong thick wavy shoulder-length hair, flowing slightly backward. Full thick beard and mustache.\n\nCLOTHING:\n\nDark fitted short-sleeve shirt with leather shoulder holster straps.\n\nLIGHTING & ENVIRONMENT:\n\nFire provides primary light, casting warm highlights and deep shadows. Industrial alley with cables, metal structures, smoke, and dim lights.\n\nFACE IDENTITY:\n\nUse uploaded face exactly, matching fire lighting and shadows.\n\nSTYLE & QUALITY:\n\nUltra-photorealistic cinematic realism, HDR lighting, detailed skin, realistic fire and smoke.`
    }
];

const gridContainer = document.getElementById('prompt-grid');
const modal = document.getElementById('prompt-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImage = document.getElementById('modal-image');
const modalVideo = document.getElementById('modal-video');

function renderPrompts() {
    gridContainer.innerHTML = '';
    promptsData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'prompt-card animate-up';
        
        // OPTIMIZATION: Always use a thumbnail image for the grid to prevent 10 videos autoplaying and crashing the browser
        let mediaHtml = item.thumbnailPath 
            ? `<img src="${item.thumbnailPath}" alt="${item.title}" class="prompt-card-media" loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/716x716/eef2ff/4f46e5?text=Media+Not+Found';">` 
            : '';

        card.innerHTML = `
            ${mediaHtml}
            <div class="prompt-card-content">
                <span class="prompt-badge ${item.badgeClass}">${item.badgeText}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div class="prompt-footer">
                    <button class="btn-view" onclick="openModal(${item.id})">View Details</button>
                    <button class="btn-icon" onclick="copyPromptFromCard(${item.id}, this)" title="Copy Prompt">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                </div>
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

window.openModal = function(id) {
    const data = promptsData.find(item => item.id === id);
    if (!data) return;

    document.getElementById('modal-badge').className = `prompt-badge ${data.badgeClass}`;
    document.getElementById('modal-badge').textContent = data.badgeText;
    document.getElementById('modal-title').textContent = data.title;
    
    if (data.file) {
        document.getElementById('modal-file-container').style.display = 'inline-flex';
        document.getElementById('modal-file').textContent = data.file;
    } else {
        document.getElementById('modal-file-container').style.display = 'none';
    }
    
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-prompt-text').textContent = data.promptText;

    modalImage.style.display = "none";
    modalVideo.style.display = "none";
    modalImage.src = "";
    modalVideo.src = "";

    // Load actual video or full image ONLY inside the modal
    if (data.mediaPath && data.mediaPath.trim() !== "") {
        if (data.mediaType === 'video') {
            modalVideo.src = data.mediaPath;
            modalVideo.style.display = "block";
        } else {
            modalImage.src = data.mediaPath;
            modalImage.style.display = "block";
        }
    }

    const modalCopyBtn = document.getElementById('modal-copy-btn');
    modalCopyBtn.onclick = function() { copyText(data.promptText, this, true); };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { 
        modalImage.src = ""; 
        modalVideo.src = ""; 
    }, 300); 
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); 
});

// OPTIMIZATION: Pressing ESC key closes the modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

window.copyPromptFromCard = function(id, buttonElement) {
    const data = promptsData.find(item => item.id === id);
    if(data) copyText(data.promptText, buttonElement, false);
}

window.copyText = function(text, buttonElement, isModalBtn = false) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHtml = buttonElement.innerHTML;
        
        if(isModalBtn) {
            buttonElement.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            buttonElement.style.background = 'rgba(22, 163, 74, 0.2)'; 
            buttonElement.style.borderColor = 'rgba(22, 163, 74, 0.5)';
        } else {
            buttonElement.innerHTML = '<i class="fa-solid fa-check" style="color:#16a34a;"></i>';
        }

        setTimeout(() => {
            buttonElement.innerHTML = originalHtml;
            if(isModalBtn) {
                buttonElement.style.background = '';
                buttonElement.style.borderColor = '';
            }
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert("Failed to copy. Please select and copy manually.");
    });
};

renderPrompts();