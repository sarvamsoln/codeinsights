document.addEventListener('DOMContentLoaded', function() {
    const tableFilter = document.getElementById('tableFilter');
    const table = document.getElementById('contestTable');
    const rows = table.getElementsByTagName('tr');

    tableFilter.addEventListener('keyup', function() {
        const filter = tableFilter.value.toLowerCase();
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = false;
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].innerText.toLowerCase().includes(filter)) {
                    match = true;
                    break;
                }
            }
            rows[i].style.display = match ? '' : 'none';
        }
    });
});