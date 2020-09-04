require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name         = "RNJolocom"
  s.summary      = package["description"]
  s.version      = package["version"]
  s.description  = <<-DESC
                  RNJolocom
                   DESC
  s.homepage     = "https://github.com/jolocom/react-native-jolocom"
  s.license      = "Apache-2.0"
  s.author       = { "Jolocom Dev" => "dev@jolocom.io" }
  s.platform     = :ios, "9.0"
  s.source       = { :git => "https://github.com/jolocom/react-native-jolocom.git", :tag => "master" }
  s.source_files  = "RNJolocom.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "JolocomCore"
end
