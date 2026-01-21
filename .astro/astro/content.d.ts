declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"do-medicare-benefits-cover-skilled-nursing-care.md": {
	id: "do-medicare-benefits-cover-skilled-nursing-care.md";
  slug: "do-medicare-benefits-cover-skilled-nursing-care";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-medicare-changes-in-2026-will-affect-older-adults.md": {
	id: "how-medicare-changes-in-2026-will-affect-older-adults.md";
  slug: "how-medicare-changes-in-2026-will-affect-older-adults";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"when-to-hire-a-home-care-service-for-an-older-adult.md": {
	id: "when-to-hire-a-home-care-service-for-an-older-adult.md";
  slug: "when-to-hire-a-home-care-service-for-an-older-adult";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"case-results": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "case-results";
  data: InferEntrySchema<"case-results">;
  render(): Render[".md"];
}>;
"faq": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">;
  render(): Render[".md"];
}>;
"services": {
"elder-law.md": {
	id: "elder-law.md";
  slug: "elder-law";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"estate-planning.md": {
	id: "estate-planning.md";
  slug: "estate-planning";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"life-estate-planning.md": {
	id: "life-estate-planning.md";
  slug: "life-estate-planning";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"medicaid-family-planning.md": {
	id: "medicaid-family-planning.md";
  slug: "medicaid-family-planning";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"probate-trust-administration.md": {
	id: "probate-trust-administration.md";
  slug: "probate-trust-administration";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"va-benefits.md": {
	id: "va-benefits.md";
  slug: "va-benefits";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"wills-trusts.md": {
	id: "wills-trusts.md";
  slug: "wills-trusts";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
};
"team": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "team";
  data: InferEntrySchema<"team">;
  render(): Render[".md"];
}>;
"testimonials": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		"athletics": Record<string, {
  id: string;
  collection: "athletics";
  data: any;
}>;
"events": Record<string, {
  id: string;
  collection: "events";
  data: any;
}>;
"faculty": Record<string, {
  id: string;
  collection: "faculty";
  data: any;
}>;
"industries": Record<string, {
  id: string;
  collection: "industries";
  data: any;
}>;
"insights": Record<string, {
  id: string;
  collection: "insights";
  data: any;
}>;
"listings": Record<string, {
  id: string;
  collection: "listings";
  data: any;
}>;
"locations": Record<string, {
  id: string;
  collection: "locations";
  data: any;
}>;
"menu": Record<string, {
  id: string;
  collection: "menu";
  data: any;
}>;
"news": Record<string, {
  id: string;
  collection: "news";
  data: any;
}>;
"portfolio": Record<string, {
  id: string;
  collection: "portfolio";
  data: any;
}>;
"pricing-plans": Record<string, {
  id: string;
  collection: "pricing-plans";
  data: any;
}>;
"products": Record<string, {
  id: string;
  collection: "products";
  data: any;
}>;
"programs": Record<string, {
  id: string;
  collection: "programs";
  data: any;
}>;

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
