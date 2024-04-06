const { MercadoPagoConfig, Preference } = require("mercadopago")

const client = new MercadoPagoConfig({
    accessToken: "TEST-8054699789068479-011617-72b23383222bdfb995476e801ab3aabb-1642204652",
  });
const postPago = async (req, res) => {
    try {
        const body = {
          items: [
            {
              title: req.body.title,
              quantity: Number(req.body.quantity),
              unit_price: Number(req.body.price),
              currency_id: "ARS",
            },
          ],
          back_urls: {
            success: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            failure: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            pending: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
          auto_return: "approved",
        };
    
        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
          id: result.id,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "Error al crear la preferencia :(",
        });
      }
    }



module.exports = {postPago};
