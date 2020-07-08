declare module 'unicode-bidirectional/dist/unicode.bidirectional' {
	export function resolve( characters: array ): array;
	export function reorder( characters: array, codepoints: array ): array;
}
