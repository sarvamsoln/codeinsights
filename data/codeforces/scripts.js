async function fetchFolders() {
    try {
        const response = await fetch('./folders.json');
        const data = await response.json();
        return data.folders;
    } catch (error) {
        console.error('Error fetching folders:', error);
        return [];
    }
}

async function fetchContestData(folder) {
    try {
        const response = await fetch(`./${folder}/contest.json`);
        const data = await response.json();
        console.log('Contest data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching contest data:', error);
        return null;
    }
}

async function loadContests() {
    const folders = await fetchFolders();
    const contentDiv = document.getElementById('content');

    for (const folder of folders) {
        const contestData = await fetchContestData(folder);
        if (contestData) {
            const folderDiv = document.createElement('div');
            folderDiv.className = 'folder';
            folderDiv.innerHTML = `<h2>${contestData.contest.name}</h2><p>Date: ${contestData.contest.date}</p>`;

            contestData.contest.problems.forEach(problem => {
                const problemDiv = document.createElement('div');
                problemDiv.className = 'problem';
                problemDiv.innerHTML = `
                    <p>Problem ID: ${problem.id}</p>
                    <p>Problem Name: ${problem.name}</p>
                    <p>Points: ${problem.points}</p>
                    <p>Tags: ${problem.tags.join(', ')}</p>
                    <p><a href="${problem.problemLink}" target="_blank">Problem Link</a></p>
                    <p><a href="${problem.solutionLink}" target="_blank">Solution Link</a></p>
                `;
                folderDiv.appendChild(problemDiv);
            });

            contentDiv.appendChild(folderDiv);
        }
    }
}

function filterContests() {
    const filterValue = document.getElementById('filterInput').value.toLowerCase();
    const folders = document.getElementsByClassName('folder');

    Array.from(folders).forEach(folder => {
        const contestName = folder.getElementsByTagName('h2')[0].innerText.toLowerCase();
        const problems = folder.getElementsByClassName('problem');
        let match = contestName.includes(filterValue);

        Array.from(problems).forEach(problem => {
            const problemText = problem.innerText.toLowerCase();
            if (problemText.includes(filterValue)) {
                match = true;
                problem.style.display = '';
            } else {
                problem.style.display = match ? '' : 'none';
            }
        });

        folder.style.display = match ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadContests();
    document.getElementById('filterInput').addEventListener('keyup', filterContests);
});