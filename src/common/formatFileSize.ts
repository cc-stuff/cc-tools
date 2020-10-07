
export function formatFileSize(bytes: number): string {
	let size = "Bytes";

	if (bytes > 1024) {
		bytes = bytes / 1024;
		size = "KB";
	}

	if (bytes > 1024) {
		bytes = bytes / 1024;
		size = "MB";
	}

	return `${bytes.toFixed(2)} ${size}`;
}
