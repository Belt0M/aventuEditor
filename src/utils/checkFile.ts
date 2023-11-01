export const checkFile = (file: File) => {
	if (!file) {
		return 0
	}
	// Check file type
	const allowedTypes = ['image/jpeg', 'image/png']
	if (!allowedTypes.includes(file.type)) {
		alert('Invalid file type. Please upload a JPG or PNG image.')
		return 0
	}
	// Check file size
	const maxSize = 17 * 1024 ** 2 // 17MB
	if (file.size > maxSize) {
		alert('File size exceeds the maximum allowed size (17MB).')
		return 0
	}

	return 1
}
