provider "azurerm" {
  features {}
  subscription_id = "74822dc6-4697-42f7-b9cf-366ecb7211d9"
}

resource "azurerm_resource_group" "tictactrip" {
  name     = var.resource_group_name
  location = var.location
}


resource "azurerm_virtual_network" "vnet" {
  name                = "exo-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.tictactrip.location
  resource_group_name = azurerm_resource_group.tictactrip.name
}


resource "azurerm_subnet" "subnet" {
  name                 = "exo-subnet"
  resource_group_name  = azurerm_resource_group.tictactrip.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}


resource "azurerm_public_ip" "public_ip" {
  name                = "exo-public-ip"
  resource_group_name = azurerm_resource_group.tictactrip.name
  location            = azurerm_resource_group.tictactrip.location
  allocation_method   = "Static"
}


resource "azurerm_network_security_group" "nsg" {
  name                = "exo-nsg"
  location            = azurerm_resource_group.tictactrip.location
  resource_group_name = azurerm_resource_group.tictactrip.name
}


resource "azurerm_linux_virtual_machine" "vm" {
  name                = "exo-vm"
  resource_group_name = azurerm_resource_group.tictactrip.name
  location            = azurerm_resource_group.tictactrip.location
  size                = "Standard_B1s"
  admin_username      = "azureuser"
  network_interface_ids = [
    azurerm_network_interface.nic.id,
  ]
  admin_ssh_key {
    username   = "azureuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}

resource "azurerm_network_security_rule" "ssh" {
  name                        = "allow_ssh"
  priority                    = 1001
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.tictactrip.name
  network_security_group_name = azurerm_network_security_group.nsg.name
}

resource "azurerm_network_interface_security_group_association" "nsg_association" {
  network_interface_id      = azurerm_network_interface.nic.id
  network_security_group_id = azurerm_network_security_group.nsg.id
}

resource "azurerm_network_interface" "nic" {
  name                = "exo-nic"
  location            = azurerm_resource_group.tictactrip.location
  resource_group_name = azurerm_resource_group.tictactrip.name
  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.public_ip.id
  }
}