package eu.slipo.workbench.common.model.process;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import eu.slipo.workbench.common.model.poi.EnumResourceType;
import eu.slipo.workbench.common.model.resource.ResourceIdentifier;

/**
 * A process input resource that already exists in the catalog
 */
public class CatalogResource extends ProcessInput
{
    private static final long serialVersionUID = 1L;

    private ResourceIdentifier resource;

    private String description;

    protected CatalogResource() 
    {
        super(-1, EnumInputType.CATALOG, EnumResourceType.UNDEFINED, null);
    }

    public CatalogResource(int key, EnumResourceType resourceType, String title, long id, long version) 
    {
        super(key, EnumInputType.CATALOG, resourceType, title);
        this.resource = new ResourceIdentifier(id, version);
    }

    public CatalogResource(
        int key, EnumResourceType resourceType, String title, long id, long version, String description) 
    {
        super(key, EnumInputType.CATALOG, resourceType, title);
        this.resource = new ResourceIdentifier(id, version);
        this.description = description;
    }

    public CatalogResource(
        int key, EnumResourceType resourceType, String title, ResourceIdentifier resourceIdentifier) 
    {
        super(key, EnumInputType.CATALOG, resourceType, title);
        this.resource = new ResourceIdentifier(resourceIdentifier);
    }

    public CatalogResource(
        int key, EnumResourceType resourceType, String title, ResourceIdentifier resourceIdentifier, String description)
    {
        super(key, EnumInputType.CATALOG, resourceType, title);
        this.resource = new ResourceIdentifier(resourceIdentifier);
        this.description = description;
    }

    @JsonIgnore
    public long getId() {
        return this.resource.getId();
    }

    @JsonIgnore
    public long getVersion() {
        return this.resource.getVersion();
    }

    @JsonProperty
    public ResourceIdentifier getResource() {
        return resource;
    }

    @JsonProperty
    public void setResource(ResourceIdentifier resourceIdentifier) {
        this.resource = resourceIdentifier;
    }

    @JsonProperty
    public String getDescription() {
        return description;
    }
    
    @JsonProperty
    public void setDescription(String description)
    {
        this.description = description;
    }

    @Override
    public String toString()
    {
        return String.format(
            "CatalogResource [resource=%s, description=%s, key=%s, inputType=%s, resourceType=%s]",
            resource, description, key, inputType, resourceType);
    }
}
