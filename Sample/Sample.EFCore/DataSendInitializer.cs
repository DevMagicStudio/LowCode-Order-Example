namespace Sample;

internal class DataSendInitializer
{
    public static void Initialize(DbContext context)
    {
        if (context is DataContext ctx)
        {
            if (!ctx.Manufacturer.Any())
            {
                var data = new Manufacturer()
                {
                    CompanyName = "Totole",
                    Products = new List<Product>
                    {
                        new Product()
                        {
                            ProductDate = DateTime.Now,
                            ProductBatch = $"Tot{DateTime.Now:yyyyMMdd}001",
                            ProductName = "Totole chicken",
                            ProductPrice = 10.4m,
                            ProductSpecify = "20g/bag",
                            ShelfLife = 360,
                            ShelfLifeUnit = ShelfLifeUnit.Day
                        },
                        new Product()
                        {
                            ProductDate = DateTime.Now,
                            ProductBatch = $"Tot{DateTime.Now:yyyyMMdd}001",
                            ProductName = "Totole chicken",
                            ProductPrice = 20.99m,
                            ProductSpecify = "50g/bag",
                            ShelfLife = 2,
                            ShelfLifeUnit = ShelfLifeUnit.Year
                        }
                    },
                    ContactNumber = "+86-07553476666"
                };
                
                var data2 = new Manufacturer()
                {
                    CompanyName = "Junlebao",
                    Products = new List<Product>
                    {
                        new Product()
                        {
                            ProductDate = DateTime.Now,
                            ProductBatch = $"J-{DateTime.Now:yyyyMMdd}-001",
                            ProductName = "Infant Milk",
                            ProductPrice = 300m,
                            ProductSpecify = "300g/bottle",
                            ShelfLife = 6,
                            ShelfLifeUnit = ShelfLifeUnit.Month
                        },
                        new Product()
                        {
                            ProductDate = DateTime.Now,
                            ProductBatch = $"J-{DateTime.Now:yyyyMMdd}-001",
                            ProductName = "Oatmeal",
                            ProductPrice = 49.99m,
                            ProductSpecify = "1kg/bag",
                            ShelfLife = 2,
                            ShelfLifeUnit = ShelfLifeUnit.Year
                        }
                    },
                    ContactNumber = "+86-01077689958"
                };
                
                ctx.AddRange(data, data2);

                ctx.SaveChanges();
                             
            }

            if (!ctx.Consumer.Any())
            {
                var data = new Consumer()
                {
                    Name = "Jarry",
                    Telephone = "+86 18967676636"
                };
                
                var data2 = new Consumer()
                {
                    Name = "Jesson",
                    Telephone = "+7 2004541"
                };
                
                ctx.AddRange(data, data2);
                
                ctx.SaveChanges();
            }
        }
    }
}
