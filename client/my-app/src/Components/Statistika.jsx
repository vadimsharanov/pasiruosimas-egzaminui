function Statistika({count,totalRide}) {
    return (
        <div>
            <h1>{count}</h1>
            <h1>{totalRide}</h1>
        </div>
    )
}

export default Statistika

// Sukurkite statistikos laukelius, kuriuose būtų atvaizduojamas paspirtukų kiekis ir bendras
// visų paspirtukų nuvažiuotas kilometrų kiekis (duomenys gaunami iš serverio duomenų
// bazės) Keičiantis duomenų bazės įrašams automatiškai turi keistis ir statistika.