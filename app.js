const clickSound = new Audio('clic.mp3');
fetch('https://potterapi-fedeperin.vercel.app/es/characters?search=Weasley')
    .then(res => res.json())
    .then(res => {
        const charactersContainer = document.getElementById('characters');
        
        res.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-aos', 'flip-left'); // Efecto AOS
            card.setAttribute('data-aos-easing', 'ease-out-cubic'); // Suavizado
            card.setAttribute('data-aos-duration', '2000'); // Duración del efecto

            // Solo crear imagen si existe
            if (character.image) {
                const img = document.createElement('img');
                img.src = character.image;
                img.classList.add('card-img-top');
                img.alt = character.fullName;
                card.appendChild(img);
            }

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = character.fullName;

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = `Casa de Hogwarts: ${character.hogwartsHouse}`;

            const additionalInfo = document.createElement('p');
            additionalInfo.classList.add('additional-info');
            additionalInfo.textContent = `Interpretado por: ${character.interpretedBy}, Fecha de nacimiento: ${character.birthdate}`;
            additionalInfo.style.display = 'none';

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(additionalInfo);
            card.appendChild(cardBody);

            card.addEventListener('click', () => {
                additionalInfo.style.display = additionalInfo.style.display === 'none' ? 'block' : 'none';
                clickSound.play(); // Reproduce el sonido
            });

            charactersContainer.appendChild(card);
        });
    })
    .catch(err => console.error(err));


