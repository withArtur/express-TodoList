process.on('uncaughtException', (err) => {
    process.stderr.write('Errore: O: AAAAAAAA');
    process.stdout.write('\n');
    process.stdout.write('\n');
    console.log(err);
})

process.stdin.on('data', (data) => {
    console.log(`Ciao ${data}`);

    process.stdout.write(`Tempo di attività: ${process.uptime()} secondi `);
    process.stdout.write('\n');
    process.stdout.write('\n');

    process.stdout.write(`Memoria usata: `, process.memoryUsage());
});

console.log(`Tempo di attività: ${process.uptime()} secondi`);
process.stdout.write('Scrivi il tuo nome e premi invio: ');
