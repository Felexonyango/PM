using Mapster;

namespace ProjectM
{
    public static class MapsterConfig
    {
        public static void Configure()
        {
            // // Define the mappings using TypeAdapterConfig
            // TypeAdapterConfig<PostDto, Post>
            //     .NewConfig()
            //     .TwoWays()
            //    .Ignore(dest => dest.Comments)
            //     .Ignore(dest => dest.PostedBy);
                
            // TypeAdapterConfig<BookDto, Book>
            //     .NewConfig()
            //     .TwoWays()
            //     .MaxDepth(1); // Set the maximum depth to 1 to avoid circular references

            // TypeAdapterConfig<ProductDtos, Product>
            //     .NewConfig()
            //     .TwoWays()
            //     .MaxDepth(1); // Set the maximum depth to 1 to avoid circular references

                
            // TypeAdapterConfig<CommentDto, Comment>
            //     .NewConfig()
            //     .TwoWays()
            //     .MaxDepth(1); // Set the maximum depth to 1 to avoid circular references

            //      TypeAdapterConfig<FileUploadDTo, FileUpload>
            //     .NewConfig()
            //     .TwoWays()
            //     .MaxDepth(1); // Set the maximum depth to 1 to avoid circular references
            //       TypeAdapterConfig<StockDto, Stock>
            //     .NewConfig()
            //     .TwoWays()
            //     .MaxDepth(1); // Set the maximum depth to 1 to avoid circular references
        }
    }
}
