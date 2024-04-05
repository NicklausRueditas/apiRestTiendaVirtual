import { Injectable, NotFoundException } from '@nestjs/common';
import { Client, ClientDocument } from '../schemas/clients/client.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from '../dto/client/create-client.dto';
import { UpdateClientDto } from '../dto/client/update-client.dto';

@Injectable()
export class ClientsService {
    constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) { }

    async create(createClientDto: CreateClientDto): Promise<Client> {
        try {
            const createdClient = new this.clientModel(createClientDto);
            return await createdClient.save();
        } catch (error) {
            throw new Error('Error al crear el cliente.');
        }
    }

    async findAll(): Promise<Client[]> {
        try {
            return await this.clientModel.find().exec();
        } catch (error) {
            throw new Error('Error al obtener todos los clientes.');
        }
    }

    async findById(id: string): Promise<Client | null> {
        try {
            return await this.clientModel.findById(id).exec();
        } catch (error) {
            throw new Error('Error al obtener el cliente por ID.');
        }
    }

    async update(id: string, updateClientDto: UpdateClientDto): Promise<Client | null> {
        try {
            const updatedClient = await this.clientModel.findByIdAndUpdate(id, updateClientDto, { new: true }).exec();
            if (!updatedClient) {
                throw new NotFoundException('Cliente no encontrado.');
            }
            return updatedClient;
        } catch (error) {
            throw new Error('Error al actualizar el cliente.');
        }
    }

    async remove(id: string): Promise<Client | null> {
        try {
            const removedClient = await this.clientModel.findByIdAndRemove(id).exec();
            if (!removedClient) {
                throw new NotFoundException('Cliente no encontrado.');
            }
            return removedClient;
        } catch (error) {
            throw new Error('Error al eliminar el cliente.');
        }
    }
}
