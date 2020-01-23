import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'image'),
        filename: (req, file, c) => {
            var ext = path.extname(file.originalname);
            var nome = path.basename(file.originalname, ext);

            c(null, `${nome}-${Date.now()}${ext}`)
        }
    })
}