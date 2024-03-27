import { spawn } from "child_process";
import find from "find-process";

class WinAppDriverRunner {
    async startWinAppDriver(pathToWinAppDriver: string): Promise<void> {
        // Primero, comprueba si WinAppDriver ya está en ejecución
        const processList = await find('name', 'WinAppDriver.exe');

        if (processList.length > 0) {
            // Si el proceso ya está en ejecución, salta la nueva ejecución
            console.log("WinAppDriver ya está en ejecución.");
        } else {
            // Si WinAppDriver no está en ejecución, inicia el proceso
            const winAppDriverProcess = spawn(pathToWinAppDriver);

            console.log(`WinAppDriver iniciado con PID: ${winAppDriverProcess.pid}`);

            // Captura la salida estándar
            winAppDriverProcess.stdout.on("data", (data) => {
                console.log(`stdout: ${data}`);
            });

            // Captura la salida de error
            winAppDriverProcess.stderr.on("data", (data) => {
                console.error(`stderr: ${data}`);
            });

            // Maneja el cierre del proceso
            winAppDriverProcess.on("close", (code) => {
                console.log(`WinAppDriver se cerró con el código ${code}`);
            });
        }
    }
}

export default WinAppDriverRunner;
