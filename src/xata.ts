import { buildClient, getDeployPreviewBranch } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "Categories",
    checkConstraints: {
      Categories_xata_id_length_xata_id: {
        name: "Categories_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: ["id"],
    uniqueConstraints: {
      Categories__pgroll_new_xata_id_key: {
        name: "Categories__pgroll_new_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "id",
        type: "int",
        notNull: true,
        unique: true,
        defaultValue:
          "nextval('bb_urlee3tasl3cfbitohq27bkqf4_na9p0r.\"Categories_id_seq\"'::regclass)",
        comment: "",
      },
      {
        name: "image",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "name",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type DatabaseSchema = {
  Categories: CategoriesRecord;
};

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      {
        apiKey: process.env.XATA_API_KEY,
        databaseURL: process.env.XATA_DATABASE_URL,
        // Use deploy preview branch if available, otherwise use branch from environment
        branch:
          getDeployPreviewBranch(process.env) ??
          process.env.XATA_BRANCH ??
          "main",
        ...options,
      },
      tables
    );
  }
}

export type Categories = InferredTypes["Categories"];
export type CategoriesRecord = Categories & XataRecord;
