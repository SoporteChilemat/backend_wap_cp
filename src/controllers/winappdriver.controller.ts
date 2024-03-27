import express, { Express, Request, Response } from "express";
import expressWs, { Application } from "express-ws";
import type { Router } from "express-ws";
import Winappdriver from "../services/winappdriver.service";
import WinAppDriverRunner from './winAppDriverRunner';
import { exec } from "child_process";

class WinappdriverController {
    private router: Router;
    private service: Winappdriver;

    constructor() {
        // expressWs devuelve un objeto que contiene 'app' extendido con funcionalidades de WebSocket
        this.router = expressWs(express()).app as Router;
        this.service = new Winappdriver();
        this.registerRoutes();
    }

    private registerRoutes(): void {
        // Endpoint para interactuar con WinAppDriver
        this.router.get("/winappdriver", async (req: Request, res: Response) => {
            const { body } = req;
            try {
                console.log('AH');

                // Reemplaza esto con la ruta completa a tu ejecutable de WinAppDriver
                const pathToWinAppDriver = "C:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe";

                const runner = new WinAppDriverRunner();
                runner.startWinAppDriver(pathToWinAppDriver);

                // Envía una solicitud a WinAppDriver con los datos recibidos
                const response = await this.service.precedimiento(); // Suponiendo que someMethod es tu método para interactuar con WinAppDriver

                // Envía la respuesta de WinAppDriver de vuelta al cliente
                res.status(200).json(response);
            } catch (error) {
                console.error("Error al interactuar con WinAppDriver:", error);
                res.status(500).send("Error al interactuar con WinAppDriver");
            }
        });

        // Aquí debes adjuntar tu router a tu aplicación Express
        // Esto se hace usualmente fuera de la clase, pero es crucial para que las rutas sean efectivas
    }

    public getController(): Router {
        return this.router;
    }
}

export default WinappdriverController;
