variable "location" {
  description = "You can find a list of azure regions in here https://gist.github.com/ausfestivus/04e55c7d80229069bf3bc75870630ec8"
  type        = string
  default = "West Europe"
}
variable "resource_group_name" {
  description = "tictactrip"
  type        = string
  default     = "tictactrip"
}