export interface Attribute {
  name: string;
  type: string;
  required: boolean;
  unique?: boolean;
}

export interface Content {
  attributes: Attribute[];
}

interface Config {
  name: string;
  content: Content;
}

export const createDatamodelPrisma = ({ name, content }: Config) =>
  `type ${name} {\n` +
  `\t${content.attributes
    .map(
      attr =>
        `${attr.name}: ${attr.type}${attr.required ? "!" : ""}${
          attr.unique ? " @unique" : ""
        }`
    )
    .join("\n")}` +
  `}`;
