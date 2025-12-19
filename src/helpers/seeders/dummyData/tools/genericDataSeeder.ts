import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

interface Props {
    row: Object;
    uniqueColumn?: string;
    entity: any;
}

@Injectable()
export class GenericDataSeederService {
    constructor(private readonly dataSource: DataSource) {}

    async seedData({ row, uniqueColumn, entity }: Props) {
        const rowData = uniqueColumn ? row[uniqueColumn] : JSON.stringify(row);

        const entityName = new entity().constructor.name;

        console.log(
            `🚀 Seeding ${entityName} table with DATA of ${rowData}...`
        );

        const repo = this.dataSource.getRepository(entity);

        if (uniqueColumn) {
            const existing = await repo.findOneBy({
                [uniqueColumn]: row[uniqueColumn],
            });

            if (existing) {
                console.log(
                    `🟨 Seeding ${entityName} table with DATA of ${rowData} was done earlier.`
                );
                return;
            }
        }

        const data = repo.create(row);

        const saving = await repo.save(data);

        console.log(
            `🟢 Seeding ${entityName} table with DATA of ${rowData} is done successfully.`
        );

        return saving;
    }
}
